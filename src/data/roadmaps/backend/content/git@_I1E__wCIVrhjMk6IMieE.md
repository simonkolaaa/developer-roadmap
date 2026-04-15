# Git

Git is a distributed version control system created by Linus Torvalds in 2005. Tracks code changes, enables collaborative development, maintains complete history, and supports branching/merging. Each developer has full repository copy, allowing offline work and robust collaboration.

Visit the following resources to learn more:

- [@roadmap@Visit Dedicated Git & GitHub Roadmap](https://roadmap.sh/git-github)
- [@official@Git Documentation](https://git-scm.com/doc)
- [@article@Git Cheat Sheet](https://cs.fyi/guide/git-cheatsheet)
- [@article@Learn Git Branching](https://learngitbranching.js.org/)
- [@video@Git & GitHub Crash Course For Beginners](https://www.youtube.com/watch?v=SWYqp7iY_Tc)
- [@video@Learn Git - Full Course](https://www.youtube.com/watch?v=rH3zE7VlIMs)
- [@feed@Explore top posts about Git](https://app.daily.dev/tags/git?ref=roadmapsh)

## 📚 Appunti Personali (IT)

### 03_Controllo_di_Versione_con_Git.md
# Controllo di Versione con Git e GitHub

## 1. A Cosa Serve il Controllo di Versione?

Il **controllo di versione** è un sistema che tiene traccia delle modifiche apportate ai file nel tempo. Permette di:
-   **Salvare "fotografie"** del progetto in momenti specifici.
-   **Tornare a versioni precedenti** se qualcosa va storto.
-   **Collaborare** con altre persone sullo stesso progetto senza creare conflitti.
-   Capire **chi ha modificato cosa e quando**.

**Git** è il software di controllo di versione più usato al mondo. **GitHub** è una piattaforma online che ospita i repository Git e facilita la collaborazione.

## 2. Il Repository: L'Archivio del Tuo Progetto

Un **repository** (o "repo") è semplicemente una cartella che contiene tutti i file del tuo progetto, insieme alla cronologia completa di tutte le modifiche.

### Creare un Repository su GitHub

1.  Vai su [GitHub](https://github.com) e accedi.
2.  Clicca su `+` in alto a destra e seleziona `New repository`.
3.  Dai un nome al repository, scegli se renderlo pubblico o privato e clicca su `Create repository`.

### Clonare un Repository Esistente

"Clonare" significa creare una copia locale di un repository che esiste su GitHub.

1.  Sulla pagina del repository su GitHub, clicca su `Code` e copia l'URL (HTTPS).
2.  In VSCode, apri la Palette dei Comandi (`Ctrl+Shift+P` o `F1`).
3.  Digita `Git: Clone` e premi Invio.
4.  Incolla l'URL e scegli una cartella sul tuo computer dove salvare il progetto.

## 3. Il Flusso di Lavoro Fondamentale

Il ciclo di lavoro con Git consiste nel salvare le modifiche (commit) e sincronizzarle con il repository remoto (push/pull).

### a) Fare un Commit: Salvare una "Fotografia" delle Modifiche

Un **commit** è un salvataggio permanente delle modifiche nel tuo repository locale.

1.  **Modifica i file**: Lavora sul tuo codice come faresti normalmente.
2.  **Visualizza le modifiche**: Vai alla scheda `Source Control` (`Ctrl+Shift+G`) in VSCode. Vedrai una lista dei file che hai modificato.
3.  **Stage (Prepara) le modifiche**: Clicca sul `+` accanto ai file che vuoi includere nel salvataggio. Questo li sposta nell'area di "staging".
4.  **Scrivi un messaggio di commit**: Nella casella di testo in alto, scrivi un messaggio breve ma descrittivo che spieghi cosa hai fatto (es. "Aggiunta funzione di login").
5.  **Esegui il commit**: Clicca sul segno di spunta (✓) per salvare le modifiche nel tuo repository locale.

### b) Sincronizzare con GitHub: Push e Pull

Una volta che hai salvato le modifiche localmente, devi sincronizzarle con GitHub.

*   **Push**: Invia i tuoi commit locali al repository remoto su GitHub. È come caricare i tuoi salvataggi.
    *   **Come fare**: Nella scheda `Source Control`, clicca sui tre puntini (`...`) e seleziona `Push`.

*   **Pull**: Scarica i commit che altri hanno caricato sul repository remoto. È come aggiornare il tuo progetto con le modifiche fatte dai tuoi collaboratori.
    *   **Come fare**: Clicca sui tre puntini (`...`) e seleziona `Pull`.

> **Buona pratica**: Esegui sempre un `pull` prima di iniziare a lavorare per assicurarti di avere la versione più aggiornata del progetto.

### Il Tasto "Sync Changes"

VSCode offre un comodo pulsante "Sync Changes" (Sincronizza Modifiche) nella barra di stato in basso a sinistra. Questo comando esegue prima un `pull` e poi un `push`, mantenendo il tuo repository locale e quello remoto perfettamente allineati.



### 07_Uso_Responsabile_dell_IA_GitHub_Copilot.md
# Uso Responsabile dell'IA: GitHub Copilot

## 1. Cos'è GitHub Copilot?

Immagina di avere al tuo fianco un programmatore esperto che non si stanca mai, conosce quasi tutti i linguaggi di programmazione e può darti suggerimenti in tempo reale mentre scrivi. Questo è, in sintesi, GitHub Copilot.

**Copilot è un assistente di programmazione basato sull'Intelligenza Artificiale.** Non scrive il codice *al posto tuo*, ma ti aiuta a scriverlo meglio e più velocemente, completando righe di codice, suggerendo intere funzioni e persino aiutandoti a capire parti di codice complesse.

*   **Analogia**: Pensa a Copilot non come a un pilota automatico che guida l'aereo per te, ma come a un **copilota esperto**. Tu, il pilota, hai sempre il controllo e la responsabilità finale. Il copilota ti aiuta con i compiti di routine, ti avvisa di possibili problemi e ti fornisce informazioni, ma la decisione su cosa fare spetta sempre a te.

## 2. Configurazione in VS Code

Integrare Copilot nel tuo ambiente di lavoro è semplicissimo:

1.  Apri Visual Studio Code.
2.  Vai alla vista "Estensioni" (`Ctrl+Shift+X`).
3.  Cerca l'estensione **"GitHub Copilot"** e installala.
4.  La prima volta ti verrà chiesto di effettuare l'accesso con il tuo account GitHub per autorizzare l'estensione. Segui le istruzioni a schermo.

Una volta attivato, vedrai una piccola icona di Copilot nella barra di stato in basso a destra di VS Code.

## 3. Le Regole d'Oro: Come Usarlo Correttamente

Usare l'IA in modo efficace è un'abilità. Seguire queste regole ti impedirà di usare Copilot come una "stampella" e ti aiuterà a usarlo come un "propulsore" per il tuo apprendimento.

#### Regola n.1: Tu sei il Pilota, l'IA è il Copilota
La responsabilità finale del codice che scrivi è **sempre e solo tua**. Devi essere in grado di capire, spiegare e giustificare ogni singola riga del tuo programma. Se non capisci un suggerimento di Copilot, non usarlo.

#### Regola n.2: Mai Fidarsi Ciecamente
Copilot è incredibilmente potente, ma **non è infallibile**. Può generare codice che contiene bug, che è inefficiente o che non fa esattamente quello che vuoi. Ogni suggerimento va letto, analizzato e mentalmente verificato prima di essere accettato.

#### Regola n.3: Usa l'IA per Accelerare, non per Sostituire il Pensiero
L'IA è uno strumento per automatizzare i compiti ripetitivi o per superare piccoli blocchi, non per evitare di pensare. La progettazione del programma, la logica generale e la struttura del codice devono venire da te.

## 4. Casi d'Uso Virtuosi (Come Sfruttarlo al Meglio)

Ecco alcuni modi intelligenti per collaborare con il tuo copilota IA:

*   **Completamento Automatico Potenziato:** Inizia a scrivere un ciclo `for` per iterare su una lista e Copilot probabilmente ti suggerirà l'intero blocco di codice corretto.
    ```python
    voti =
    # Inizia a scrivere "for voto in voti:" e osserva...
    ```

*   **Generare Codice Ripetitivo (Boilerplate):** Invece di riscrivere per l'ennesima volta il codice per leggere un file, puoi chiederlo a Copilot.
    ```python
    # Scrivi un commento e osserva il suggerimento:
    # funzione che legge un file JSON e restituisce il suo contenuto
    ```

*   **Imparare e Scoprire:** Se non ricordi come si fa qualcosa, puoi chiederlo direttamente.
    ```python
    # come si ordina una lista di dizionari in base alla chiave "eta"?
    studenti = [{"nome": "Mario", "eta": 17}, {"nome": "Luisa", "eta": 16}]
    # Inizia a scrivere "studenti_ordinati = sorted(...)"
    ```

*   **Scrivere Commenti e Documentazione:** Se hai scritto una funzione complessa, puoi chiedere a Copilot di documentarla per te. Seleziona la funzione e usa la chat di Copilot per chiedere: "Scrivi una docstring per questa funzione".

## 5. Anti-Pattern (Cosa NON Fare)

*   **Scrivere un commento con la traccia dell'esercizio:** Non scrivere `# Esercizio 04: Gestore della lista della spesa` e aspettarti che Copilot scriva l'intera soluzione. Questo non ti insegna nulla.
*   **Accettare i suggerimenti senza leggerli:** Premere `Tab` a ripetizione senza capire cosa si sta aggiungendo al codice è il modo più veloce per creare un programma pieno di bug e che non capisci.
*   **Chiedere all'IA di risolvere un errore al posto tuo:** Invece di fare copia-incolla di un messaggio di errore e chiedere "risolvi", chiedi "Quali sono le possibili cause di questo errore?". In questo modo, impari a fare debug.

**In conclusione:** GitHub Copilot è uno strumento rivoluzionario. Imparare a usarlo bene fin da subito ti renderà uno sviluppatore più rapido, efficiente e consapevole.


