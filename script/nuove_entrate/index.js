const request = require("request"),
  fs = require("fs"),
  uuid = require("uuid/v4"),
  asyncLoop = require("node-async-loop")

function stampaJSON(json) {
  if (json) {
    var jsonParsato = JSON.stringify(JSON.parse(json), null, 2)
    console.log(jsonParsato)
  }
}

request({
  method: "POST",
  uri: "https://localhost:8443/api/select",
  headers: {
    "Content-Type": "application/json",
    "CSRF-Token": "n5kk1elt-PGX7rnAOhCF9OUnGkQeU0_h5x1o",
    "Cookie": request.cookie("_csrf=tRTxu3IMFpjUFdC9u2B3el6J")
  },
  body: JSON.stringify({
    "from": ["artista"],
    "orderby": "rand",
    "limit": 3
  }),
  strictSSL: false
}, (err, res, body) => {
  if (err)
    console.log("error:", err);

  console.log("statusCode:", res && res.statusCode);

  stampaJSON(body)

  var listaArtisti = JSON.parse(body);
  var listaGeneri = []

  asyncLoop(listaArtisti, (item, next) => {
    request({
      method: "GET",
      uri: "https://localhost:8443/api/lang?name=" + item.nome.toString(),
      headers: {
        "Content-Type": "application/json"
      },
      strictSSL: false
    }, (err, res, body) => {
      if (err)
        console.log("error:", err);

      listaGeneri.push({
        "id_artista": item.id,
        "id_genere": uuid(),
        "nome": body
      })
      next()
    })
  }, () => {
    console.log(listaGeneri)
  });

});