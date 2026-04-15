# What is HTTP?

HTTP (Hypertext Transfer Protocol) transmits hypertext over the web using request-response model. Defines message formatting and server-browser communication. Stateless protocol where each request is independent. Forms foundation of web communication, often used with HTTPS for encryption.

Visit the following resources to learn more:

- [@course@Full HTTP Networking Course](https://www.youtube.com/watch?v=2JYT5f2isg4)
- [@article@What is HTTP?](https://www.cloudflare.com/en-gb/learning/ddos/glossary/hypertext-transfer-protocol-http/)
- [@article@Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [@article@HTTP/3 From A To Z: Core Concepts](https://www.smashingmagazine.com/2021/08/http3-core-concepts-part1/)
- [@article@Every thing you need to know about HTTP](https://www3.ntu.edu.sg/home/ehchua/programming/webprogramming/HTTP_Basics.html)
- [@video@HTTP/1 to HTTP/2 to HTTP/3](https://www.youtube.com/watch?v=a-sBfyiXysI)
- [@video@SSL, TLS, HTTPS Explained](https://www.youtube.com/watch?v=j9QmMEWmcfo)

## 📚 Appunti Personali (IT)

### 02_HTTP.md
## Il Protocollo HTTP <!-- omit in toc -->

- [Cos'è HTTP?](#cosè-http)
- [Il Modello Client-Server](#il-modello-client-server)
- [La Struttura di un Messaggio HTTP](#la-struttura-di-un-messaggio-http)
  - [Richiesta HTTP (Request)](#richiesta-http-request)
  - [Risposta HTTP (Response)](#risposta-http-response)
- [Metodi HTTP Comuni](#metodi-http-comuni)
- [Status Code Comuni](#status-code-comuni)

### Cos'è HTTP?

**HTTP (HyperText Transfer Protocol)** è il protocollo, ovvero l'insieme di regole di comunicazione, che permette ai client (come i browser web) di richiedere e ricevere risorse (come pagine HTML, immagini, dati) dai server. È il linguaggio fondamentale del web.

Una caratteristica chiave di HTTP è di essere **stateless** (senza stato): ogni richiesta è un evento indipendente e il server non conserva alcuna informazione sulle richieste precedenti dello stesso client.

### Il Modello Client-Server

La comunicazione web si basa sul modello client-server:

1.  Il **Client** (es. il tuo browser) inizia la comunicazione inviando una **richiesta HTTP** a un server per ottenere una risorsa.
2.  Il **Server** (es. un server web che ospita un sito) riceve la richiesta, la elabora e invia indietro una **risposta HTTP**, che contiene la risorsa richiesta o un messaggio di errore.

### La Struttura di un Messaggio HTTP

Sia le richieste che le risposte seguono una struttura simile, composta da:

1.  **Start-Line**: La prima riga, che definisce il tipo di messaggio.
2.  **Headers**: Coppie chiave-valore che forniscono metadati sulla richiesta/risposta.
3.  **Body (Corpo)**: Contiene i dati effettivi (opzionale).

#### Richiesta HTTP (Request)

- **Start-Line**: Contiene il **metodo HTTP**, l'**URL** della risorsa e la **versione di HTTP**.
  `GET /utenti/123 HTTP/1.1`
- **Headers**: Informazioni aggiuntive.
  - `Host: api.esempio.com` (il dominio del server)
  - `Accept: application/json` (il formato di dati che il client si aspetta di ricevere)
- **Body**: I dati inviati al server, ad esempio con una richiesta `POST`.

#### Risposta HTTP (Response)

- **Start-Line (Status-Line)**: Contiene la **versione di HTTP**, uno **status code** e un **messaggio di stato**.
  `HTTP/1.1 200 OK`
- **Headers**:
  - `Content-Type: application/json` (il formato dei dati nel corpo della risposta)
  - `Content-Length: 150` (la dimensione del corpo)
- **Body**: I dati richiesti (es. il JSON di un utente, il codice HTML di una pagina).

### Metodi HTTP Comuni

I metodi HTTP (o "verbi") specificano l'azione che il client desidera eseguire sulla risorsa. I più importanti sono:

- **`GET`**: Richiede una rappresentazione della risorsa specificata. È usato per **leggere** dati.
- **`POST`**: Invia dati a un server per **creare** una nuova risorsa.
- **`PUT`**: **Sostituisce** completamente una risorsa esistente con i dati forniti.
- **`PATCH`**: Applica modifiche **parziali** a una risorsa.
- **`DELETE`**: **Rimuove** la risorsa specificata.

### Status Code Comuni

Gli status code indicano l'esito della richiesta. Sono raggruppati in categorie:

- **2xx (Successo)**
  - `200 OK`: La richiesta è andata a buon fine.
  - `201 Created`: La richiesta è andata a buon fine e una nuova risorsa è stata creata (usato in risposta a `POST`).
- **3xx (Redirezione)**
  - `302 Found`: La risorsa è stata temporaneamente spostata a un altro URL.
- **4xx (Errori del Client)**
  - `400 Bad Request`: Il server non può elaborare la richiesta a causa di un errore del client (es. sintassi errata).
  - `401 Unauthorized`: È richiesta l'autenticazione.
  - `403 Forbidden`: Il client non ha i permessi per accedere alla risorsa.
  - `404 Not Found`: La risorsa richiesta non è stata trovata.
- **5xx (Errori del Server)**
  - `500 Internal Server Error`: Si è verificato un errore generico sul server.


### 03_HTTPS.md
## HTTPS: Sicurezza nella Comunicazione Web <!-- omit in toc -->

- [Perché HTTP non è sufficiente?](#perché-http-non-è-sufficiente)
- [Cos'è HTTPS?](#cosè-https)
- [Come Funziona HTTPS: Crittografia e Certificati](#come-funziona-https-crittografia-e-certificati)
  - [1. Il "TLS Handshake"](#1-il-tls-handshake)
  - [2. La Comunicazione Cifrata](#2-la-comunicazione-cifrata)
- [Le Certificate Authority (CA)](#le-certificate-authority-ca)

### Perché HTTP non è sufficiente?

Il protocollo HTTP, nella sua forma base, trasmette i dati in **testo in chiaro**. Questo significa che chiunque si trovi "in mezzo" alla comunicazione tra il client e il server (es. un malintenzionato sulla stessa rete Wi-Fi) può intercettare e leggere facilmente le informazioni scambiate. Questo è estremamente pericoloso, specialmente se i dati trasmessi sono sensibili, come password, numeri di carte di credito o messaggi privati.

### Cos'è HTTPS?

**HTTPS (HyperText Transfer Protocol Secure)** non è un protocollo separato, ma è semplicemente il protocollo **HTTP incapsulato all'interno di un livello di sicurezza**, chiamato **TLS (Transport Layer Security)**, o il suo predecessore, SSL (Secure Sockets Layer).

HTTPS fornisce tre garanzie di sicurezza fondamentali:

1.  **Crittografia**: I dati scambiati tra client e server sono cifrati, rendendoli incomprensibili a chiunque li intercetti.
2.  **Integrità**: Garantisce che i dati non vengano alterati durante la trasmissione.
3.  **Autenticazione**: Verifica che il server con cui si sta comunicando sia effettivamente chi dice di essere, proteggendo da attacchi "man-in-the-middle".

### Come Funziona HTTPS: Crittografia e Certificati

Il processo si basa sulla **crittografia a chiave pubblica/privata** e sui **certificati digitali**.

#### 1. Il "TLS Handshake"

Quando un client (il tuo browser) si connette a un server tramite HTTPS, avviene un processo di negoziazione chiamato "handshake":

1.  **Client Hello**: Il client invia un messaggio al server, dicendo "Ciao, voglio stabilire una connessione sicura".
2.  **Server Hello**: Il server risponde inviando il suo **certificato SSL/TLS**.
3.  **Verifica del Certificato**: Il browser controlla che il certificato sia valido e che sia stato emesso da un'autorità di certificazione (CA) attendibile. Questo certificato contiene la **chiave pubblica** del server.
4.  **Generazione Chiave di Sessione**: Se il certificato è valido, il browser genera una **chiave di sessione** simmetrica (una chiave segreta temporanea).
5.  **Invio Sicuro della Chiave**: Il browser cifra la chiave di sessione appena creata utilizzando la **chiave pubblica del server** e la invia al server.
6.  **Inizio della Sessione Sicura**: Solo il server, con la sua **chiave privata** corrispondente, può decifrare il messaggio e ottenere la chiave di sessione.

#### 2. La Comunicazione Cifrata

Da questo momento in poi, sia il client che il server possiedono la stessa **chiave di sessione simmetrica**. Tutta la comunicazione successiva viene cifrata e decifrata utilizzando questa chiave, che è molto più veloce della crittografia a chiave pubblica/privata, rendendo la connessione sicura ed efficiente.

### Le Certificate Authority (CA)

Come fa il browser a fidarsi del certificato di un server? Perché è stato firmato digitalmente da una **Certificate Authority (CA)**, un'entità di fiducia (come Let's Encrypt, DigiCert, ecc.). I sistemi operativi e i browser hanno un elenco preinstallato di CA attendibili. Se un certificato è firmato da una di queste, il browser lo considera valido, garantendo l'autenticità del server.


