<img src="https://i.postimg.cc/wvDwWdzc/Logo.png" width="500">
WhatsTheHit è una web-app che offre la possibilità di cercare e ascoltare le canzoni più famose dell'ultimo secolo.

# Caratteristiche
  - Interfaccia semplice 
  - Ascolto immediato

È possibile inoltre:
  - Interrogare direttamente il server con query personalizzate

Lo scopo finale è quello di riuscire ad analizzare e studiare l'andamento della musica nell'ultimo decennio personalmente e velocemente.

### Tecnologie usate

WhatsTheHit usa altri progetti open-source per funzionare:

* [node.js] - runtime javascript asincrona per backend
* [Express] - framework backend veloce e minimale per node.js
* [nodemon] - strumento di riavvio automatico del server
* [knex] - compositore di query sql
* [wikidata-sdk] - libreria per interrogare l'api di wikidata

### Installazione

WhatsTheHit richiede [Node.js](https://nodejs.org/) versione 11.x per funzionare.

#### Server

Clonare la repo e installare le dipendenze con un gestore pacchetti come [yarn] o [npm]

```bash
cd ./WhatsTheHit
yarn
# oppure
npm install
```

Avviare il server con debug su terminale

```bash
yarn watch
# oppure
npm run watch
```

WhatsTheHit supporta anche [pm2], utilizzabile tramite i comandi
```bash
# Avvia un istanza di debug pm2
yarn debug-start

# Visualizza il log del debugger
yarn debug-logs

# Stoppa l'istanza di debug
yarn debug-stop
```

Avviare il server in ambienti di produzione

```bash
yarn start
# oppure
npm run start
```

Per una guida su come interrogare l'API consultare la [wiki] di questa repository.

#### Client

```bash
cd static
yarn
yarn start
```

Creare una versione da sorgente del client

```bash
yarn build
```

Licenza
----
MIT

[//]: # (Link usati nel testo http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [yarn]: <https://yarnpkg.com>
   [npm]: <https://www.npmjs.com>
   [pm2]: <http://pm2.keymetrics.io>
   [nodemon]: <https://github.com/remy/nodemon>
   [knex]: <https://knexjs.org/>
   [wikidata-sdk]: <https://github.com/maxlath/wikidata-sdk>
   [wiki]: https://github.com/tambdev/WhatsTheHit/wiki
