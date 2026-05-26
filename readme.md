# Simonkola Roadmaps

Benvenuto nel progetto **Simonkola Roadmaps**, una collezione curata di percorsi di studio (roadmaps), mappe concettuali, appunti universitari e risorse di sviluppo.


##  Funzionalità Principali

1. **Percorsi Personali Interattivi**: A differenza del progetto originale, qui i dati sono gestiti in locale per permettere una completa autonomia. I percorsi includono:
   - Fondamenti di Programmazione
   - Programmazione a Oggetti
   - Java, Python, Rust, Go
   - Sviluppo Web e Database
   - **Esame di Maturità** e altro ancora.

2. **Nuovi Modelli Aggiunti**:
   - Frontend Avanzato
   - Backend Node.js
   - Cybersecurity

3. **Integrazione con Obsidian**:
   - La mappa concettuale interattiva (basata su Mermaid.js) supporta collegamenti diretti alla tua repository personale di Obsidian (vault: `IT_notes`). Cliccando su determinati argomenti, sarai in grado di saltare direttamente ai tuoi appunti nativi! (Il pulsante è stato recentemente riscritto per garantire massima accessibilità e supporto da qualsiasi browser senza blocchi di iframe).

4. **Bottoni e Redirect Sistemati**:
   - Tutte le sezioni della piattaforma ora non puntano più all'ecosistema di terze parti o alle API del fork originale. I percorsi sono isolati nel progetto locale, permettendoti di esplorare e creare le tue mappe senza essere reindirizzato inavvertitamente all'esterno.

##  Come Aggiungere i Propri Percorsi

I percorsi sono definiti all'interno di `src/data/local-roadmaps.ts`. Puoi:

1. Creare una nuova entrata nell'array `LOCAL_ROADMAPS`.
2. Assegnare un tipo (`role`, `skill`, o `best-practice`) e gli argomenti (topics) desiderati.
3. Se l'argomento ha una propria mappa strutturata, puoi inserire il percorso JSON nel campo `json`.

##  Development

Per avviare l'applicazione in locale, installa le dipendenze usando pnpm (oppure npm/yarn):

```bash
pnpm install
```

Poi avvia il server di sviluppo:

```bash
pnpm dev
```

La piattaforma sarà visibile su `http://localhost:3000` (o altra porta specificata nel terminale).

## Ringraziamenti

Basato originariamente sul motore grafico di `roadmap.sh`. Rielaborato e isolato per l'ecosistema privato "Simonkola Roadmaps".
