# Regole di lavoro — Progetto Mai Thai (Redesign Sito)

## Regole fondamentali di sviluppo

### Struttura file
- Creare sempre file separati per ogni sezione o componente
- Non creare mai un unico file HTML monolitico con tutto il codice
- CSS separato per ogni sezione, mai tutto in un solo foglio stile
- JS separato e modulare, mai inline nell'HTML salvo casi eccezionali

### Approccio per sessione
- Lavorare su una sezione/file alla volta
- Completare e verificare ogni file prima di passare al successivo
- Ogni sessione ha un obiettivo chiaro e circoscritto

### Struttura cartelle del progetto
```
/SITO
  index.html
  CLAUDE.md
  /css
    reset.css
    base.css
    header.css
    hero.css
    menu.css
    footer.css
    (altri file per sezione)
  /js
    main.js
    (altri file per funzionalità)
  /images
  /fonts
```

### Collegamento dei file
- Usare sempre `<link>` nell'`index.html` per i CSS
- Usare sempre `<script src="...">` per i JS
- Mantenere l'`index.html` snello: solo struttura e riferimenti ai file esterni

## Regole di comunicazione

- Procedere passo per passo, senza anticipare sezioni non ancora richieste
- Prima di iniziare una nuova sezione, confermare con l'utente
- Se una scelta stilistica è ambigua, chiedere prima di implementare
- Segnalare sempre quale file si sta creando o modificando

## Informazioni progetto

- **Cliente:** Mai Thai
- **Tipo sito:** Redesign sito ristorante thai — stile bold/pop/street food premium
- **Pagine:** Home, Sedi, Menu, Contatti
- **Lingua:** Italiano

## Brand identity

### Palette colori
- **Primario:** #E30D18 (rosso — colore dominante, sfondo principale)
- **Secondario:** #FFD100 (giallo/oro brillante — da post Instagram)
- **Testo chiaro:** #FFFFFF
- **Outline/dettagli:** #010202 (quasi nero — dal logo SVG)

### Font
- **Titoli:** Gorilla Milkshake (font custom — file .woff da ricevere)
  - Placeholder temporaneo: usare Google Fonts "Lilita One" fino a quando non è disponibile il file
- **Testo corpo:** Open Sans (Google Fonts)

### Stile visivo
- Full immersion nel rosso: sfondo #E30D18 dominante
- Elementi decorativi thai (nuvole ornamentali, spirali) in giallo #FFD100
- Tipografia bold e d'impatto per i titoli
- Tono: energico, giocoso, irreverente ("Croccante è meglio!", "Scoprili oggi... Sognali domani")
- Riferimento: stile post Instagram esistenti

### Asset disponibili
- Logo: `elefante mai thai.svg` (elefante in rosso/nero, testo "MAI THAI" con stile ornamentale)
- Post Instagram: materiale visivo di riferimento per stile e tono
- Immagini piatti: da ricevere

### Asset mancanti
- Font Gorilla Milkshake in formato .woff/.woff2 (attualmente solo .tiff — non utilizzabile sul web)
- Immagini del locale e dei piatti

## Note aggiornate in corso d'opera

- Il font Gorilla Milkshake è custom e non disponibile online. Usare Lilita One come placeholder. Sostituire appena disponibile il .woff
- Convertire il .tiff del font in .woff2 tramite strumento come fontsquirrel.com o transfonter.org
