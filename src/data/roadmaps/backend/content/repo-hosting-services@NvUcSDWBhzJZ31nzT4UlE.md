# Repo Hosting Services

Repo hosting services provide storage, management, and collaboration tools for version-controlled code repositories. Support Git, Mercurial, Subversion with features like branching, pull requests, issue tracking, code review, and CI/CD integration. Popular services: GitHub, GitLab, Bitbucket.

Visit the following resources to learn more:

- [@official@GitHub](https://github.com)
- [@official@GitLab](https://about.gitlab.com/)
- [@official@BitBucket](https://bitbucket.org/product/guides/getting-started/overview)

## 📚 Appunti Personali (IT)

### 02_DB_e_Repository.md
# Lezione 1: Database SQL e Repository Pattern

Finora il nostro sito usava dati finti. Ora useremo **SQLite**, un vero database che salva i dati in un file.

In questa lezione:
1.  Creeremo uno script per costruire il database (tabelle).
2.  Creeremo il modulo per connetterci.
3.  Scriveremo il nostro primo **Repository**.

### 1. Lo Schema SQL (`app/schema.sql`)

Prima di tutto, decidiamo quali tabelle ci servono.
Crea il file `app/schema.sql`.

```sql
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES user (id)
);
```

### 2. Costruire il Database (Script `setup_db.py`)

Invece di usare comandi complessi di Flask, creiamo un semplice script Python che eseguiamo **una volta sola** per creare il file del database.

Crea un file `setup_db.py` nella cartella principale del progetto (fuori da `app`).

```python
import sqlite3
import os

# Definiamo dove creare il file del database (nella cartella instance)
if not os.path.exists('instance'):
    os.makedirs('instance')

db_path = os.path.join('instance', 'blog.sqlite')

# Ci connettiamo (se il file non esiste, lo crea)
connection = sqlite3.connect(db_path)

# Leggiamo lo schema SQL
with open('app/schema.sql') as f:
    connection.executescript(f.read())

print("Database creato con successo in:", db_path)
connection.close()
```

**Eseguiamolo subito:**
Apri il terminale e scrivi:
```bash
python setup_db.py
```
Se vedi "Database creato con successo", hai finito la configurazione iniziale!

### 3. Gestire la Connessione (`app/db.py`)

Ora dobbiamo dire a Flask come connettersi al database quando l'app è in esecuzione.
Crea `app/db.py`.

```python
import sqlite3
from flask import current_app, g

def get_db():
    """Restituisce la connessione al database per la richiesta corrente."""
    # 'g' è uno zaino temporaneo di Flask. 
    # Se la connessione c'è già, la riusiamo. Se no, la creiamo.
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE']
        )
        # Questa riga serve per poter chiamare le colonne per nome (user['username'])
        g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    """Chiude la connessione alla fine della richiesta."""
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_app(app):
    """Registra la funzione di chiusura automatica."""
    # Dice a Flask: "Quando hai finito di caricare la pagina, chiudi sempre il DB"
    app.teardown_appcontext(close_db)
```


### 4. Attivare la chiusura automatica

Dobbiamo dire alla nostra applicazione di usare la funzione `init_app` che abbiamo appena scritto, altrimenti le connessioni rimarranno aperte bloccando tutto.

Apri `app/__init__.py` e aggiungi:

```python
def create_app():
    # ... codice precedente ...

    # --- AGGIUNGI QUESTO ---
    from . import db
    db.init_app(app)
    # -----------------------

    return app
```

### 5. Il Repository Pattern: `user_repository.py`

Ora che la "plumbing" (idraulica) è pronta, scriviamo il codice che useremo davvero.
Il **Repository** è l'unico posto dove scriveremo SQL.

Crea `app/repositories/user_repository.py`.

```python
# Importiamo la nostra funzione per prendere la connessione
from app.db import get_db

def create_user(username, password_hash):
    """Inserisce un nuovo utente."""
    db = get_db()
    try:
        db.execute(
            "INSERT INTO user (username, password) VALUES (?, ?)",
            (username, password_hash),
        )
        db.commit() # Salviamo le modifiche
        return True
    except db.IntegrityError:
        # Errore: lo username esiste già
        return False

def get_user_by_username(username):
    """Cerca un utente per nome."""
    db = get_db()
    user = db.execute(
        "SELECT * FROM user WHERE username = ?", (username,)
    ).fetchone()
    return user

def get_user_by_id(user_id):
    """Cerca un utente per ID."""
    db = get_db()
    user = db.execute(
        "SELECT * FROM user WHERE id = ?", (user_id,)
    ).fetchone()
    return user
```

Fatto! Abbiamo un sistema database pulito, semplice e funzionante.

### 02_Repository_dei_Post.md
# Lezione 1: Il Repository dei Post e le Relazioni SQL

Il cuore di un blog sono i post. Un post non vive da solo: è scritto da un **Autore**.
In SQL, questa è una relazione **Molti-a-Uno**: molti post possono essere scritti dallo stesso utente.

Nel nostro repository, dovremo scrivere query che collegano le due tabelle (`post` e `user`) usando la clausola `JOIN`.

### 1. Creare `app/repositories/post_repository.py`

Questo file gestirà tutte le operazioni sui post.

```python
from app.db import get_db

def find_all():
    """
    Recupera tutti i post.
    Esegue una JOIN con la tabella user per ottenere anche lo username dell'autore.
    """
    db = get_db()
    # Spiegazione Query:
    # SELECT p.*, u.username: Prendi tutto del post e SOLO lo username dell'utente
    # FROM post p: 'p' è un soprannome (alias) per la tabella post
    # JOIN user u: 'u' è un soprannome per la tabella user
    # ON p.author_id = u.id: Collega le righe dove l'ID combacia
    query = """
        SELECT p.id, p.title, p.body, p.created, p.author_id, u.username
        FROM post p
        JOIN user u ON p.author_id = u.id
        ORDER BY p.created DESC
    """
    return db.execute(query).fetchall()

def find_by_id(post_id):
    """Recupera un singolo post per ID (con JOIN per l'autore)."""
    db = get_db()
    query = """
        SELECT p.id, p.title, p.body, p.created, p.author_id, u.username
        FROM post p
        JOIN user u ON p.author_id = u.id
        WHERE p.id = ?
    """
    # fetchone() perché ci aspettiamo un solo risultato
    post = db.execute(query, (post_id,)).fetchone()
    return post

def create(title, body, author_id):
    """Crea un nuovo post."""
    db = get_db()
    db.execute(
        'INSERT INTO post (title, body, author_id) VALUES (?, ?, ?)',
        (title, body, author_id)
    )
    db.commit()

def update(post_id, title, body):
    """Aggiorna un post."""
    db = get_db()
    db.execute(
        'UPDATE post SET title = ?, body = ? WHERE id = ?',
        (title, body, post_id)
    )
    db.commit()

def delete(post_id):
    """Elimina un post."""
    db = get_db()
    db.execute('DELETE FROM post WHERE id = ?', (post_id,))
    db.commit()
```

