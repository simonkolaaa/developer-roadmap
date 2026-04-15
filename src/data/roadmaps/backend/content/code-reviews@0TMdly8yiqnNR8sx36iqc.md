# AI-Powered Code Reviews

AI-powered code reviews leverage machine learning models to analyze source code and identify potential issues, such as bugs, security vulnerabilities, code style violations, and performance bottlenecks. These tools can automate parts of the code review process, freeing up developers to focus on more complex problems and improving the overall quality and maintainability of the codebase.

Visit the following resources to learn more:

- [@article@AI Code Reviews](https://github.com/resources/articles/ai-code-reviews)
- [@article@AI Code Review: How to Make it Work for You](https://www.startearly.ai/post/ai-code-review-how-to-make-it-work-for-you)
- [@video@You've Been Using AI the Hard Way (Use This Instead)](https://www.youtube.com/watch?v=MsQACpcuTkU)
- [@video@Automatic code reviews with OpenAI Codex](https://www.youtube.com/watch?v=HwbSWVg5Ln4&t=83s)

## 📚 Appunti Personali (IT)

### 04_Ambiente_di_Sviluppo_con_VSCode.md
# Ambiente di Sviluppo con VSCode

## 1. Cos'è un IDE?

Un **IDE (Integrated Development Environment)**, o Ambiente di Sviluppo Integrato, è un'applicazione software che fornisce agli sviluppatori tutti gli strumenti necessari per scrivere, testare e correggere il codice in un unico posto.

Un buon IDE include:
-   **Editor di Codice Avanzato**: Con evidenziazione della sintassi e suggerimenti automatici.
-   **Debugger**: Per trovare e risolvere errori nel codice.
-   **Terminale Integrato**: Per eseguire comandi senza lasciare l'editor.
-   **Integrazione con Git**: Per gestire il controllo di versione.

**Visual Studio Code (VSCode)** è uno degli IDE più popolari al mondo. È leggero, veloce e incredibilmente personalizzabile grazie a un vasto marketplace di estensioni.

## 2. WSL: Linux dentro Windows

**WSL (Windows Subsystem for Linux)** è una funzionalità di Windows che permette di eseguire un ambiente Linux completo direttamente su Windows, senza bisogno di macchine virtuali.

**Perché è utile per uno sviluppatore?**
-   **Compatibilità**: Molti strumenti di sviluppo e server di produzione sono basati su Linux. Sviluppare in un ambiente simile a quello di produzione riduce i problemi.
-   **Potenza della Shell**: La shell Bash di Linux è molto più potente del Command Prompt di Windows.
-   **Integrazione Perfetta**: VSCode si integra perfettamente con WSL, permettendoti di scrivere codice su Windows ma di eseguirlo e testarlo in un ambiente Linux.

**Come installare WSL:**
1.  Apri PowerShell come Amministratore.
2.  Esegui il comando: `wsl --install`
3.  Riavvia il computer. Al riavvio, verrà installata automaticamente la distribuzione Ubuntu.

Una volta installato, puoi aprire un terminale Ubuntu direttamente da VSCode per lavorare con i comandi Bash.

## 3. SSH: Lavorare su Server Remoti

**SSH (Secure Shell)** è un protocollo che permette di connettersi e interagire in modo sicuro con un computer remoto (come un server in cloud).

VSCode, tramite l'estensione **"Remote - SSH"**, ti permette di aprire una cartella su un server remoto e lavorarci come se fosse sul tuo computer locale.

**Perché è utile?**
-   Puoi modificare i file direttamente sul server di test o produzione.
-   Puoi sfruttare la potenza di calcolo di un server potente dal tuo laptop.
-   L'ambiente di sviluppo è identico a quello di esecuzione.

**Come connettersi via SSH da VSCode:**
1.  Installa l'estensione "Remote - SSH" dal marketplace di VSCode.
2.  Apri la Palette dei Comandi (`F1` o `Ctrl+Shift+P`).
3.  Digita `Remote-SSH: Connect to Host...` e seleziona `Add New SSH Host...`.
4.  Inserisci il comando di connessione, ad esempio: `ssh nome_utente@indirizzo_ip_server`
5.  Una volta configurato, potrai connetterti al server direttamente da VSCode e aprire le sue cartelle.

