# PhyMap Trading — Sito Web

Sito professionale multi-pagina, pronto per la pubblicazione su **GitHub Pages**.

## Struttura file

```
phymap/
├── index.html                  ← Home
├── il-metodo.html              ← Il Metodo
├── software-e-formazione.html  ← Software & Formazione (con prezzi)
├── su-di-noi.html              ← Su di noi
├── contatti.html               ← Contatti & Social
├── informazioni-legali.html    ← Informazioni Legali
├── dichiarazione-privacy.html  ← Privacy Policy
├── css/
│   └── style.css               ← Stili condivisi
├── js/
│   └── main.js                 ← JavaScript condiviso
└── README.md                   ← Questo file
```

## Come pubblicare su GitHub Pages

### Metodo 1 — Repository nuovo (consigliato)

1. Vai su [github.com](https://github.com) e crea un nuovo repository
   - Nome suggerito: `phymap-trading` (oppure `<tuousername>.github.io`)
2. Carica tutti i file di questa cartella nel repository
3. Vai su **Settings → Pages**
4. In "Source" seleziona **Deploy from a branch**
5. Scegli il branch `main` e la cartella `/ (root)`
6. Clicca **Save**
7. Dopo 1–2 minuti il sito sarà live su:
   `https://<tuousername>.github.io/phymap-trading/`

### Metodo 2 — GitHub Desktop (più semplice)

1. Scarica [GitHub Desktop](https://desktop.github.com/)
2. Crea un nuovo repository locale puntando a questa cartella
3. Pubblica su GitHub con il tasto "Publish repository"
4. Attiva Pages come al punto 3–6 sopra

### Dominio personalizzato (opzionale)

Per usare `phymaptrading.com` invece di `github.io`:
1. Vai su **Settings → Pages → Custom domain**
2. Inserisci il tuo dominio
3. Sul tuo provider DNS, aggiungi un record `CNAME` che punta a `<tuousername>.github.io`

## Caratteristiche del sito

- **Dark theme** raffinato ispirato alla fluidodinamica
- **Animazione particelle** nella hero (canvas HTML5)
- **Navigazione sticky** con effetto blur al scroll
- **Scroll reveal** — elementi che appaiono entrando nel viewport
- **FAQ accordion** interattivo
- **Pricing table** con piano evidenziato
- **Video YouTube** embedded (Il Metodo)
- **Social links** con icone colorate (Contatti)
- **Responsive** — ottimizzato per mobile, tablet e desktop
- **SEO-ready** — meta tag description su ogni pagina
- **Zero dipendenze** — solo Google Fonts (CDN), nessun framework

## Font utilizzati

- **Cormorant Garamond** — titoli (elegante, editoriale)
- **Outfit** — testo body (pulito, leggibile)

Caricati da Google Fonts, quindi richiedono connessione internet.

---

*Sviluppato con ❤ partendo dal sito Jimdo originale di PhyMap Trading.*
