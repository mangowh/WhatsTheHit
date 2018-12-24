const debug = require("debug")("whatsthehit:api"),
  wdk = require("wikidata-sdk"),
  rp = require('request-promise')

module.exports = (req, res, next) => {
  var url = wdk.searchEntities({
    search: 'tiziano ferro',
    limit: 3,
    language: "it",
    format: 'json'
  })

  rp(url)
    .then((response) => {
      var id = JSON.parse(response).search[0].id
      var options = {
        "ids": id,
        "languages": ['en', 'it'],
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
      var id = entities[entity].claims.P1412.toString().split(",")
      debug(id)
      var options = {
        "ids": id,
        "languages": ['en', 'it'],
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
      var lang = entities[entity].labels

      res.send(lang)
    })
}