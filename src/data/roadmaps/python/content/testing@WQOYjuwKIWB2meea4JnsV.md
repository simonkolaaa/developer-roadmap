# Testing

Testing in programming means checking if your code works as expected. It's a systematic way to find and fix errors (bugs) before your code goes live. Imagine building a beautiful house without checking if the walls are straight or the roof doesn't leak—that's what coding without testing can feel like!

Visit the following resources to learn more:

- [@official@Unit Testing in Python](https://docs.python.org/3/library/unittest.html)
- [@article@Python Testing Tutorial](https://realpython.com/python-testing/)

## 📚 Appunti Personali (IT)

### 01_Mappa_Concettuale_Testing.md
# Mappa Concettuale: Testing e Qualità del Codice

Questa mappa riassume i concetti chiave che affronteremo in questo modulo, introducendo il testing automatico come pratica fondamentale per uno sviluppatore professionista.

```mermaid
graph TD
    A[Testing<br>del Codice] --> B[Perché Scrivere<br>Test?];
    A --> C[Unit Test];
    A --> D[Pytest];

    B --> B1[Limiti del Testing<br>Manuale con print];
    B --> B2[Vantaggi del Testing<br>Automatico];
    B2 --> B2a[Prevenzione delle<br>Regressioni];
    B2 --> B2b[Documentazione<br>Vivente];
    B2 --> B2c[Migliore<br>Progettazione];

    C --> C1[Testare Piccole<br>Unità Isolate];
    C1 --> C1a[Una Funzione è<br>un'Unità Perfetta];

    D --> D1[Installazione e<br>Configurazione];
    D --> D2[Convenzioni di<br>Pytest];
    D --> D3[L'istruzione<br>'assert'];
    D --> D4[Eseguire i<br>Test];

```

