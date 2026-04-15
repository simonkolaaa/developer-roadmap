# Real Time Data

Real-time data is processed and delivered immediately with minimal delay for prompt system responses. Essential for financial trading, gaming, analytics, and monitoring. Uses stream processing frameworks like Apache Kafka and Flink for high-speed data flows and timely decision-making.

Visit the following resources to learn more:

- [@article@Real-time Data - Wiki](https://en.wikipedia.org/wiki/Real-time_data)
- [@article@What is Real-time Data?](https://www.qlik.com/us/streaming-data/real-time-data)

## 📚 Appunti Personali (IT)

### 02_Fondamenti_di_Database.md
## Fondamenti di Database <!-- omit in toc -->

- [Definizione di Database](#definizione-di-database)
- [Sistema di Gestione di Database (DBMS)](#sistema-di-gestione-di-database-dbms)
- [Tipologie di Database](#tipologie-di-database)

I database sono un elemento cruciale nell'informatica moderna, in quanto permettono la raccolta, la gestione e il recupero efficiente di grandi quantità di dati. Questa lezione introduce i concetti fondamentali che costituiscono la base dei sistemi di database.

### Definizione di Database

Un **database** è un insieme organizzato di dati strutturati, tipicamente archiviati e gestiti tramite un sistema di gestione di database (DBMS). L'obiettivo principale di un database è quello di consentire l'archiviazione e il recupero efficiente delle informazioni, oltre a garantire la loro integrità, consistenza e sicurezza.

### Sistema di Gestione di Database (DBMS)

Un **DBMS** è un software che permette di interagire con il database. Questo sistema si occupa di gestire la struttura dei dati, l'accesso simultaneo di più utenti e l'integrità delle informazioni. Alcuni esempi di DBMS popolari includono MySQL, PostgreSQL, Microsoft SQL Server e Oracle.

Il DBMS svolge diverse funzioni chiave:

- **Archiviazione dei dati**: gestisce la memorizzazione e l'organizzazione fisica dei dati sul disco.
- **Gestione delle transazioni**: assicura che le operazioni sui dati siano eseguite correttamente, anche in caso di guasti.
- **Controllo della concorrenza**: garantisce che più utenti possano accedere ai dati contemporaneamente senza conflitti.
- **Recupero e ripristino**: protegge i dati da eventuali errori o guasti, permettendo il ripristino dello stato corretto.
- **Sicurezza**: controlla l'accesso ai dati, definendo chi può leggere, modificare o cancellare determinate informazioni.

### Tipologie di Database

I database si possono classificare in diverse tipologie, in base alla loro struttura e alle esigenze che soddisfano. Di seguito, le categorie principali:

- **Database relazionali**: questi database organizzano i dati in tabelle collegate tra loro attraverso relazioni. Ogni tabella è costituita da righe (tuple) e colonne (attributi). Questo tipo di database è basato sul _modello relazionale_ (approfondito nella lezione dedicata), e utilizza il linguaggio SQL per interagire con i dati.
- **Database NoSQL**: questi database sono progettati per gestire grandi volumi di dati non strutturati o semi-strutturati. Sono flessibili e spesso utilizzati in contesti che richiedono alta scalabilità e velocità, come le applicazioni web in tempo reale. Alcuni esempi includono MongoDB (basato su documenti) e Redis (basato su chiavi-valori).


### 04_Progettazione_del_Database.md
## Progettazione del Database <!-- omit in toc -->

- [Fasi della Progettazione del Database](#fasi-della-progettazione-del-database)

La **progettazione del database** è il processo di creazione della struttura logica e fisica di un database, assicurando che i dati siano organizzati in modo efficiente e che possano essere gestiti in modo coerente e sicuro. Una corretta progettazione permette di ottimizzare le prestazioni, migliorare l'integrità dei dati e ridurre il rischio di errori o ridondanze.

### Fasi della Progettazione del Database

La progettazione di un database si articola in diverse fasi sequenziali, che trasformano un'idea astratta in un sistema concreto. Questo approccio è spesso chiamato **"design-first"**.

1.  **Analisi dei Requisiti**: Comprendere le necessità del committente e definire quali dati devono essere memorizzati e quali operazioni devono essere eseguite.
2.  **Progettazione Concettuale**: Creare un modello ad alto livello dei dati e delle loro relazioni, indipendentemente dal DBMS specifico. Lo strumento principale di questa fase è il **Diagramma Entità-Relazione (ER)**.
3.  **Progettazione Logica**: Tradurre il modello concettuale (il diagramma ER) in uno schema relazionale, definendo tabelle, colonne, chiavi e vincoli. In questa fase si applica la **normalizzazione**.
4.  **Progettazione Fisica**: Definire come il database sarà effettivamente memorizzato e gestito dal DBMS. Questa fase include la scelta degli indici, l'allocazione dello spazio su disco e altre ottimizzazioni per le performance.

Nelle prossime lezioni, analizzeremo in dettaglio ciascuna di queste fasi.


