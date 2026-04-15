# Version Control Systems

Version Control Systems (VCS) manage and track code changes over time, enabling efficient collaboration. Record file changes, allow reverting to previous versions, and maintain modification history. Can be centralized (Subversion) or distributed (Git, Mercurial) for collaboration and code integrity.

Visit the following resources to learn more:

- [@roadmap@Visit Dedicated Git & GitHub Roadmap](https://roadmap.sh/git-github)
- [@official@Git Documentation](https://git-scm.com/doc)
- [@article@What is Version Control?](https://www.atlassian.com/git/tutorials/what-is-version-control)
- [@article@What is Version Control? - GitLab](https://about.gitlab.com/topics/version-control/)
- [@article@Comparing Workflows - Centralized vs Distributed](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [@video@Version Control System (VCS) - Everything you need to know](https://www.youtube.com/watch?v=SVkuliabq4g)
- [@video@Git for Beginners - Git & GitHub Tutorial](https://www.youtube.com/watch?v=8JJ101D3knE)

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



### 03_Accesso_Controllato_Properties.md
# Lezione 2: Accesso Controllato con le Properties

Abbiamo incapsulato i nostri dati, ma ora come facciamo a leggerli o a modificarli in modo sicuro? La risposta in Python è elegante e potente: le **properties**.

## 1. Getter e Setter: L'Approccio Tradizionale

In molti linguaggi, per accedere a un attributo privato `__punti_vita` si creano due metodi:
*   `get_punti_vita()`: per leggere il valore.
*   `set_punti_vita(valore)`: per modificare il valore, aggiungendo della logica di controllo.

Questo funziona, ma in Python c'è un modo migliore.

## 2. Le `@property`: L'Approccio "Pythonic"

Python ci permette di creare metodi `getter` e `setter` che si comportano come se fossero dei semplici attributi. Questo si ottiene con i **decoratori** `@property` e `@*.setter`.

Vediamo come applicarlo al nostro `Personaggio`:

```python
class Personaggio:
    def __init__(self, nome: str, livello: int):
        self.nome = nome
        self.__punti_vita = 100
        self.__livello = livello

    # GETTER: Questo metodo viene eseguito quando leggiamo 'eroe.punti_vita'
    @property
    def punti_vita(self) -> int:
        print("(Accesso in lettura ai punti vita)")
        return self.__punti_vita

    # SETTER: Questo metodo viene eseguito quando scriviamo 'eroe.punti_vita = valore'
    @punti_vita.setter
    def punti_vita(self, nuovo_valore: int) -> None:
        print("(Tentativo di modifica dei punti vita)")
        if nuovo_valore < 0:
            self.__punti_vita = 0 # Logica di validazione!
            print("I punti vita non possono essere negativi. Impostati a 0.")
        else:
            self.__punti_vita = nuovo_valore

    # Property in sola lettura per il livello (non ha un setter)
    @property
    def livello(self) -> int:
        return self.__livello

# --- Esempio di utilizzo ---
eroe = Personaggio("Gandalf", 20)

# 1. Lettura tramite il GETTER (@property)
print(f"PV iniziali: {eroe.punti_vita}")

# 2. Scrittura tramite il SETTER (@punti_vita.setter)
eroe.punti_vita = 50
print(f"PV dopo attacco: {eroe.punti_vita}")

# 3. Tentativo di assegnare un valore non valido
eroe.punti_vita = -30
print(f"PV dopo colpo quasi mortale: {eroe.punti_vita}")

# 4. Tentativo di modificare un attributo in sola lettura
# eroe.livello = 21 # Questo causerebbe un AttributeError!
```

### Vantaggi delle Properties:
1.  **Sintassi Pulita:** L'utente della classe accede a `eroe.punti_vita` come se fosse un attributo normale, senza dover chiamare `get...()` o `set...()`.
2.  **Controllo Totale:** Lo sviluppatore della classe mantiene il controllo totale su cosa succede quando un attributo viene letto o modificato.
3.  **Flessibilità:** Puoi iniziare con un attributo pubblico e, se in futuro avrai bisogno di aggiungere logica, puoi trasformarlo in una property senza dover cambiare tutto il codice che lo utilizzava.

