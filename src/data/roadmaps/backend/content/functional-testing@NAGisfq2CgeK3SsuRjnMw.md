# Functional Testing

Functional testing ensures software meets functional requirements through black box testing. Testers provide input and compare expected vs actual output without understanding source code. Contrasts with non-functional testing (performance, load, scalability).

Visit the following resources to learn more:

- [@official@Playwright - End-to-End Testing Documentation](https://playwright.dev/docs/intro)
- [@article@What is Functional Testing?](https://www.guru99.com/functional-testing.html)
- [@article@Functional Testing: What It Is and How to Do It Right](https://www.atlassian.com/continuous-delivery/software-testing/functional-testing)
- [@video@Functional Testing vs Non-Functional Testing](https://www.youtube.com/watch?v=NgQT7miTP9M)
- [@video@Software Testing Tutorial for Beginners](https://www.youtube.com/watch?v=u6QfIXgjwGQ)
- [@feed@Explore top posts about Testing](https://app.daily.dev/tags/testing?ref=roadmapsh)

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

