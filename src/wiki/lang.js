const debug = require("debug")("whatsthehit:api"),
  wdk = require("wikidata-sdk"),
  rp = require("request-promise"),
  { overwrite, getCode } = require("country-list"),
  CountryLanguage = require("country-language"),
  ISO6391 = require("iso-639-1");

overwrite([{
  code: "US",
  name: "United States of America"
}])

module.exports = (req, res, next) => {
  var nome = unescape(req.query.name)
  var lang = "en"
  var tipo

  var url = wdk.searchEntities({
    search: nome,
    limit: 1,
    language: lang,
    format: "json"
  })

  rp(url)
    .then((response) => {
      var id
      if (JSON.parse(response).search[0]) {
        id = JSON.parse(response).search[0].id
      } else {
        debug(response)
        throw new Error("Artista mancante");
      }
      var options = {
        "ids": id,
        "languages": lang,
      }
      return options
    })
    .then(opt => {
      return wdk.getEntities(opt)
    })
    .then(rp)
    .then(response => {
      var entities = wdk.simplify.entities(JSON.parse(response).entities)
      var entity = Object.keys(entities)[0].toString()

      var id
      if (entities[entity].claims.P1412) {
        id = entities[entity].claims.P1412.toString().split(",")
        tipo = "lingua"
      } else if (entities[entity].claims.P27) {
        id = entities[entity].claims.P27.toString().split(",")
        tipo = "paese"
      } else if (entities[entity].claims.P495) {
        id = entities[entity].claims.P495.toString().split(",")
        tipo = "paese"
      } else {
        throw new Error("Informazione lingua mancante");
      }

      var options = {
        "ids": id,
        "languages": lang,
      }
      return options
    })
    .then(opt => {
      return wdk.getEntities(opt)
    })
    .then(rp)
    .then((response) => {
      var entities = wdk.simplify.entities(JSON.parse(response).entities)
      var entity = Object.keys(entities)[0].toString()

      var result = entities[entity].labels[lang]
      if (tipo === "lingua") {
        res.send(entities[entity].labels[lang].toString().toLowerCase())
      } else if (tipo === "paese") {
        result = entities[entity].labels["en"]
        debug(result)
        if (getCode(result)) {
          CountryLanguage.getCountryLanguages(getCode(result).toUpperCase(), (err, languages) => {
            if (!err) {
              var finale = ISO6391.getName(languages[0].iso639_1)
              res.send(finale.toString().toLowerCase());
            } else {
              throw err
            }
          })
        } else {
          throw new Error("Impossibile convertire codice paese")
        }
      } else {
        throw new Error()
      }
    })
    .catch(err => {
      debug(err)
      res.status(500).send(err.message || "Errore sconosciuto")
    })
}