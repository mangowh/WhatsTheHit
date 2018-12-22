const debug = require("debug")("whatsthehit:api"),
  wdk = require("wikidata-sdk"),
  rp = require('request-promise')

module.exports = (req, res, next) => {
  debug("!ok")

  /*var url = wdk.searchEntities({
    search: 'Rihanna',
    limit: 5,
    language: "it",
    format: 'json'
  })
  
  rp(url)
    .then((response) => {
      var id = JSON.parse(response).search[0].id
      debug(id)
      return wdk.getEntities(id)
    })
    .then((url) => {
      rp(url)
        .then((response) => {
          var entity = JSON.parse(response).entities
          res.send(entity)
        })
    })
    .catch((err) => {
      res.send(err)
    })*/
}