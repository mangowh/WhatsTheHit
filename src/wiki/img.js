const debug = require("debug")("whatsthehit:api"),
  wdk = require("wikidata-sdk"),
  rp = require('request-promise'),
  { getCode, getName } = require('country-list'),
  CountryLanguage = require('country-language'),
  md5 = require("md5");

module.exports = (req, res, next) => {
  var nome = unescape(req.query.name)

  var url = wdk.searchEntities({
    search: nome,
    limit: 1,
    language: "it",
    format: 'json'
  })
  rp(url)
    .then((response) => {
      var id

      if (JSON.parse(response).search[0]) {
        id = JSON.parse(response).search[0].id
      } else {
        throw new Error('error');
      }

      var options = {
        "ids": id
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

      var nome = entities[entity].claims.P18.toString().split(",")[0];

      if (nome === "undefined") {
        throw new Error();
      }

      nome = nome.replace(/\s/g, "_");

      var hash = md5(nome);

      var link = "https://upload.wikimedia.org/wikipedia/commons/" + hash[0] + "/" + hash[0] + hash[1] + "/" + nome;

      res.send(link)
    })
    .catch(error => {
      res.render("error")
    })
}