# N plus one problem

The N+1 problem occurs when an application retrieves a list then performs additional queries for each item's related data. Results in inefficient query multiplication (1 + N queries instead of optimized joins). Severely impacts performance with larger datasets. Solved through query optimization, joins, or batching techniques.

Visit the following resources to learn more:

- [@article@In Detail Explanation of N+1 Problem](https://medium.com/doctolib/understanding-and-fixing-n-1-query-30623109fe89)
- [@article@What is the N+1 Problem](https://planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it)
- [@article@Solving N+1 Problem: For Java Backend Developers](https://dev.to/jackynote/solving-the-notorious-n1-problem-optimizing-database-queries-for-java-backend-developers-2o0p)
- [@video@SQLite and the N+1 (no) problem](https://www.youtube.com/watch?v=qPfAQY_RahA)

## 📚 Appunti Personali (IT)

### 02_Dall_Idea_al_Codice_Problem_Solving.md
# Dall'Idea al Codice: Un Approccio al Problem Solving

Sapere come funzionano `for`, `if`, liste e dizionari è come conoscere le lettere dell'alfabeto e le regole grammaticali. Ora dobbiamo imparare a scrivere una storia: come trasformare un'idea o un problema in un programma funzionante.

Questo processo si chiama **problem solving** e segue alcuni passaggi logici.

### Il Problema di Esempio
Immaginiamo di dover risolvere questo problema:
> "Data una lista di studenti, ognuno con un nome e un voto, trovare il nome dello studente con il voto più alto."

### Passaggio 1: Capire e Scomporre il Problema
La prima cosa da fare non è scrivere codice, ma pensare. Dobbiamo assicurarci di aver capito la richiesta e scomporla in passaggi più piccoli.

1.  Dobbiamo avere una lista di studenti.
2.  Per ogni studente, ci servono due informazioni: il nome e il voto.
3.  Dobbiamo esaminare *tutti* gli studenti.
4.  Mentre li esaminiamo, dobbiamo tenere traccia di chi ha il voto più alto *fino a quel momento*.
5.  Una volta esaminati tutti, il nome che abbiamo tenuto da parte sarà la nostra risposta.

### Passaggio 2: Scegliere le Strutture Dati
Come rappresentiamo i nostri dati?

*   Per "una lista di studenti", una **lista Python** sembra la scelta perfetta.
*   Per rappresentare un singolo studente con "nome e voto", un **dizionario** è ideale, perché ci permette di associare delle etichette (`"nome"`, `"voto"`) ai valori.

La nostra struttura dati sarà quindi una **lista di dizionari**:
```python
studenti = [
    {"nome": "Alice", "voto": 85},
    {"nome": "Bob", "voto": 92},
    {"nome": "Carla", "voto": 78},
]
```

### Passaggio 3: Scrivere lo Pseudo-Codice
Prima di scrivere codice Python, è utile scrivere una bozza in linguaggio umano. Questo si chiama **pseudo-codice**. Ci aiuta a definire la logica senza preoccuparci della sintassi.

```
# Inizializza una variabile per il miglior studente trovato finora a "nessuno".
# Inizializza una variabile per il voto più alto trovato finora a un valore molto basso (es. -1).

# Per ogni studente nella lista degli studenti:
#   Se il voto dello studente attuale è maggiore del voto più alto trovato finora:
#     Aggiorna il voto più alto con il voto dello studente attuale.
#     Aggiorna il miglior studente con lo studente attuale.

# Alla fine del ciclo, stampa il nome del miglior studente.
```

### Passaggio 4: Tradurre lo Pseudo-Codice in Python
Solo ora, con un piano chiaro in mente, iniziamo a scrivere il codice vero e proprio.

```python
# Dati iniziali
studenti = [
    {"nome": "Alice", "voto": 85},
    {"nome": "Bob", "voto": 92},
    {"nome": "Carla", "voto": 78},
]

# Inizializzazione delle variabili
miglior_studente_trovato = None
voto_piu_alto = -1

# Ciclo per esaminare ogni studente
for studente in studenti:
    # Condizione per verificare se abbiamo trovato un nuovo "migliore"
    if studente["voto"] > voto_piu_alto:
        voto_piu_alto = studente["voto"]
        miglior_studente_trovato = studente

# Stampa del risultato finale
if miglior_studente_trovato:
    print(f"Lo studente con il voto più alto è: {miglior_studente_trovato['nome']}")
# Output: Lo studente con il voto più alto è: Bob
```

Questo approccio strutturato (Capire -> Scegliere Dati -> Pianificare -> Codificare) è una delle abilità più importanti per un programmatore e ti aiuterà a risolvere problemi sempre più complessi.

