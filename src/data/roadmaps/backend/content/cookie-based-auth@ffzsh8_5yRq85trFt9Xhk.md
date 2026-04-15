# Cookie-Based Authentication

Cookie-based authentication maintains user sessions by storing session IDs in browser cookies. Server stores session data and uses cookies as keys. Simple to implement and browser-native, but vulnerable to CSRF attacks and challenging for cross-origin requests.

Visit the following resources to learn more:

- [@official@HTTP Cookies - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [@article@How does cookie based authentication work?](https://stackoverflow.com/questions/17769011/how-does-cookie-based-authentication-work)
- [@article@Session vs Token Authentication](https://www.section.io/engineering-education/token-based-vs-session-based-authentication/)
- [@article@Cookies vs LocalStorage vs SessionStorage](https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id)
- [@video@Session vs Token Authentication in 100 Seconds](https://www.youtube.com/watch?v=UBUNrFtufWo)
- [@video@How do cookies work?](https://www.youtube.com/watch?v=rdVPflECed8)

## 📚 Appunti Personali (IT)

### 03_Form_e_Auth.md
# Lezione 2: Form, POST e Autenticazione

Ora che abbiamo il database pronto, costruiamo le pagine per registrarci e fare login.
Useremo un nuovo Blueprint: `auth`.

### 1. Concetto Chiave: La "Doppia Vita" di una Route

Spesso in Flask una singola funzione gestisce due momenti diversi:
1.  **Metodo GET**: L'utente arriva sulla pagina. Il server deve solo **mostrare il form vuoto**.
2.  **Metodo POST**: L'utente ha compilato il form e premuto "Invia". Il server riceve i dati e deve **elaborarli**.

Nel codice useremo un `if request.method == 'POST':` per distinguere questi due momenti.

### 2. Concetto Chiave: La Sessione (La "Memoria" del Server)

Prima di scrivere il codice del Login, dobbiamo capire un problema fondamentale del Web: **Il server ha l'amnesia.**

Il protocollo HTTP è **Stateless** (senza stato). Ogni volta che chiedi una pagina, il server ti tratta come se fossi un perfetto sconosciuto, anche se hai inserito la password 10 secondi fa.

**Come facciamo a farci riconoscere?**
Usiamo una **Sessione**. Immaginala come il **braccialetto di un villaggio turistico**:
1.  All'ingresso (Login), mostri i documenti (Username/Password).
2.  Se i documenti sono validi, la reception (Server) ti mette un braccialetto (Cookie di Sessione).
3.  Da quel momento, per entrare in piscina o al bar, non mostri più i documenti: mostri solo il polso col braccialetto.

In Flask, la sessione si comporta come un dizionario che "sopravvive" tra una richiesta e l'altra. I dati vengono salvati in un **Cookie firmato** crittograficamente (ecco perché nel Modulo 3 abbiamo impostato la `SECRET_KEY`!).

### 3. Il Blueprint Auth (`app/auth.py`)

Crea il file `app/auth.py`.

```python
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
# werkzeug.security ci offre strumenti professionali per la crittografia
from werkzeug.security import check_password_hash, generate_password_hash
from app.repositories import user_repository

# url_prefix='/auth' significa che tutte le route qui inizieranno con /auth
bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    # CASO 2: POST (L'utente ha inviato i dati)
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None

        if not username:
            error = 'Username obbligatorio.'
        elif not password:
            error = 'Password obbligatoria.'

        if error is None:
            # Hashiamo la password (MAI salvarla in chiaro!)
            hashed_pwd = generate_password_hash(password)
            
            # Chiamiamo il Repository
            success = user_repository.create_user(username, hashed_pwd)
            
            if success:
                return redirect(url_for('auth.login'))
            else:
                error = f"L'utente {username} è già registrato."

        flash(error)

    # CASO 1: GET (Mostriamo il form)
    return render_template('auth/register.html')

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None
        
        # 1. Cerchiamo l'utente nel DB
        user = user_repository.get_user_by_username(username)

        if user is None:
            error = 'Username non corretto.'
        # 2. Verifichiamo la password
        elif not check_password_hash(user['password'], password):
            error = 'Password non corretta.'

        if error is None:
            # 3. GESTIONE SESSIONE (Mettiamo il "braccialetto")
            # Puliamo eventuali vecchie sessioni
            session.clear()
            # Salviamo l'ID dell'utente nel cookie di sessione
            session['user_id'] = user['id']
            
            # Ora il browser ricorderà chi siamo!
            return redirect(url_for('main.index'))

        flash(error)

    return render_template('auth/login.html')

@bp.route('/logout')
def logout():
    # Per uscire, "tagliamo il braccialetto"
    session.clear()
    return redirect(url_for('main.index'))
```

### 4. Il "Middleware": Riconoscere l'utente ovunque

C'è un ultimo problema. Flask gestisce il cookie di sessione (che contiene solo `user_id = 15`), ma noi vogliamo sapere chi è l'utente (es. "Mario") in **tutte le pagine**, per poter cambiare la barra di navigazione.

Sarebbe noioso dover cercare l'utente nel database dentro ogni singola funzione (`home`, `about`, `contact`...).

**La Soluzione: `before_app_request`**
Definiamo una funzione che Flask eseguirà **automaticamente prima** di qualsiasi altra route.

Aggiungi questa funzione in `app/auth.py` (prima delle route):

```python
@bp.before_app_request
def load_logged_in_user():
    """
    Questa funzione viene eseguita AUTOMATICAMENTE prima di ogni richiesta.
    Serve a caricare l'utente dal DB e renderlo disponibile in tutto il sito.
    """
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        # Carichiamo l'utente e lo mettiamo in g.user
        # Ora g.user sarà disponibile anche nei template HTML!
        g.user = user_repository.get_user_by_id(user_id)
```

### 5. Aggiornare `base.html` (Navbar e Flash)

Ora sfruttiamo subito il lavoro fatto. Modifichiamo `app/templates/base.html` per:
1.  Mostrare messaggi di errore (`flash`).
2.  Cambiare la Navbar se l'utente è loggato (usando `g.user`).

```html
<!-- Dentro il <body>, prima del blocco content -->

<nav>
  <a href="{{ url_for('main.index') }}">Blog Scolastico</a>
  
  <!-- LOGICA DINAMICA DELLA NAVBAR -->
  {% if g.user %}
    <!-- Se g.user esiste, l'utente è loggato -->
    <span>Ciao, {{ g.user['username'] }}</span>
    <a href="{{ url_for('auth.logout') }}">Logout</a>
  {% else %}
    <!-- Altrimenti mostriamo i tasti di accesso -->
    <a href="{{ url_for('auth.register') }}">Registrati</a>
    <a href="{{ url_for('auth.login') }}">Login</a>
  {% endif %}
</nav>

<hr>

<!-- Zona Messaggi Flash -->
{% for message in get_flashed_messages() %}
    <div class="flash" style="color: red; border: 1px solid red; padding: 10px;">
        {{ message }}
    </div>
{% endfor %}
```

### 6. I Template di Registrazione e Login

Infine, creiamo i file HTML mancanti nella cartella `app/templates/auth/`.

**`app/templates/auth/register.html`**
```html
{% extends 'base.html' %}

{% block content %}
  <h2>Registrazione</h2>
  <form method="post">
    <label for="username">Username</label>
    <input name="username" id="username" required>
    
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required>
    
    <input type="submit" value="Registrati">
  </form>
{% endblock %}
```

**`app/templates/auth/login.html`**
```html
{% extends 'base.html' %}

{% block content %}
  <h2>Accedi</h2>
  <form method="post">
    <label for="username">Username</label>
    <input name="username" id="username" required>
    
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required>
    
    <input type="submit" value="Login">
  </form>
{% endblock %}
```

### 7. Registrazione Finale

Per far funzionare tutto, ricorda di registrare il nuovo blueprint in `app/__init__.py`:

```python
    # ... dentro create_app ...
    from . import auth
    app.register_blueprint(auth.bp)
    
    return app
```

### 04_Update_Delete_Auth.md
# Lezione 3: Modifica e Cancellazione (Update/Delete)

Per completare il blog, dobbiamo permettere agli autori di modificare o cancellare i propri post.
Aggiungeremo queste funzioni nel nostro file principale: `app/main.py`.

Qui introduciamo un concetto fondamentale: **Autorizzazione**.
*   **Autenticazione:** Il sistema sa chi sei (Login).
*   **Autorizzazione:** Hai il permesso di fare questa azione? (Es. modificare un post che non hai scritto tu).

### 1. Helper per i controlli (`get_post`)

In `app/main.py`, aggiungiamo una funzione per non ripetere codice (mettila fuori dalle route, magari prima di `update`).
Questa funzione fa tre cose:
1.  Recupera il post dal DB.
2.  Controlla se esiste.
3.  Controlla se l'utente corrente è il proprietario del post.

```python
from werkzeug.exceptions import abort

def get_post(id, check_author=True):
    # 1. Recupera il post dal DB (usiamo la funzione creata nella Lezione 1)
    post = post_repository.get_post_by_id(id)

    # 2. Se non esiste -> Errore 404 Not Found
    if post is None:
        abort(404, f"Il post id {id} non esiste.")

    # 3. Controllo AUTORIZZAZIONE
    # Se check_author è attivo, controlla che l'autore sia l'utente loggato
    if check_author and post['author_id'] != g.user['id']:
        abort(403) # Errore 403 Forbidden (Vietato!)

    return post
```

### 2. La Route di Update

Qui dobbiamo applicare due livelli di sicurezza manualmente:
1.  **Sei loggato?** (`if g.user is None`)
2.  **È il tuo post?** (gestito da `get_post`)

Aggiungi a `app/main.py`:

```python
@bp.route('/<int:id>/update', methods=('GET', 'POST'))
def update(id):
    # --- LIVELLO 1: PROTEZIONE (Sei loggato?) ---
    if g.user is None:
        return redirect(url_for('auth.login'))
    
    # --- LIVELLO 2: AUTORIZZAZIONE (È tuo?) ---
    # Questa funzione blocca tutto con un errore 403 se il post non è tuo
    post = get_post(id)

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Il titolo è obbligatorio.'

        if error is not None:
            flash(error)
        else:
            # Chiamiamo la funzione di update del repository
            post_repository.update_post(id, title, body)
            return redirect(url_for('main.index'))

    return render_template('blog/update.html', post=post)
```

### 3. La Route di Delete

Anche qui, doppio controllo di sicurezza.
Nota che accettiamo solo il metodo `POST`. Perché? Per evitare che un link malevolo o un crawler cancelli i dati visitando l'URL.

Aggiungi a `app/main.py`:

```python
@bp.route('/<int:id>/delete', methods=('POST',))
def delete(id):
    # 1. Sei loggato?
    if g.user is None:
        return redirect(url_for('auth.login'))
    
    # 2. È tuo? (verifica anche che esista)
    get_post(id) 
    
    # 3. Cancella usando il repository
    post_repository.delete_post(id)
    return redirect(url_for('main.index'))
```

### 4. Il Template `blog/update.html`

Crea il file `app/templates/blog/update.html`.

Simile a quello di creazione, ma con una differenza importante: usiamo `value` per pre-compilare i campi con i dati esistenti.

La logica `request.form.get('title') or post['title']` significa:
*   Se l'utente ha provato a salvare ma c'era un errore, rimostra quello che ha appena scritto.
*   Altrimenti (è la prima volta che apre la pagina), mostra il titolo originale dal DB.

```html
{% extends 'base.html' %}

{% block content %}
  <h1>Modifica "{{ post['title'] }}"</h1>
  
  <!-- Form di Modifica -->
  <form method="post">
    <label for="title">Titolo</label>
    <input name="title" id="title" value="{{ request.form.get('title') or post['title'] }}" required>

    <label for="body">Testo</label>
    <textarea name="body" id="body" rows="5" required>{{ request.form.get('body') or post['body'] }}</textarea>

    <input type="submit" value="Salva Modifiche">
  </form>

  <hr>
  
  <!-- Form di Cancellazione (Separato) -->
  <!-- L'action punta alla route di delete con l'id del post -->
  <!-- Nota: l'endpoint è 'main.delete' -->
  <form action="{{ url_for('main.delete', id=post['id']) }}" method="post">
    <input type="submit" value="Elimina Post" 
           onclick="return confirm('Sei sicuro di voler eliminare questo post?')"
           style="background-color: red; color: white;">
  </form>
{% endblock %}
```

### Conclusione Modulo 05
Ora il tuo blog è completo e sicuro!
Hai implementato:
*   **CRUD Completo:** Create, Read, Update, Delete.
*   **Architettura:** Codice diviso in Repository (SQL), Blueprint (Python) e Template (HTML).
*   **Sicurezza:** Protezione contro accessi non autorizzati e modifica di dati altrui.

