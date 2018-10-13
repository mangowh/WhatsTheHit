"use strict";

require("dotenv").config({ path: __dirname + '/dot.env' });
var mysql = require('mysql');
var request = require('request');
var parseXMLtoJSON = require('xml2js').parseString;
var mb = require('musicbrainz');
var fs = require('fs');

//CONNESSIONE AL SERVER MYSQL LOCALE
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.ROOTPSW,
  database: "Completo"
});

connection.connect(function (err) {
  if (err) {
    console.error(err.stack);
    return;
  }
})

// RICHIESTA API
function richiestaAPI(risultato) {
  mb.searchReleases(risultato.name, {}, function (err, releases) {
    fs.writeFile("./test.json", JSON.stringify(releases, null, 2), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log(releases[0].id)
      request({
        url: "http://musicbrainz.org/ws/2/release/" + releases[0].id + "?fmt=json",
        headers: {
          "User-Agent": "request"
        }
      }, function (err, res, body) {
        console.log(body);  //Non in tutti i casi è possibile trovare il rispettivo album a partire soltanto dal nome della canzone
                            //NON è POSSIBILE ASSOCIARE CANZONE AD ALBUM
      })
    });
  });
}

// QUERY CASUALE DATABASE
var query = `
  SELECT *
  FROM completo
  WHERE type = "song"
  ORDER BY RAND()
  LIMIT 1
`;
connection.query(query, function (error, results, fields) {
  if (error) throw error;

  var risultato;

  if (typeof (results) === "undefined") {
    console.log("Insieme vuoto");
  } else {
    risultato = JSON.parse(JSON.stringify(results[0]));
    console.log(risultato);
  }
  richiestaAPI(risultato)
});

// CHIUSURA CONNESSIONE DATABASE
connection.end(function (err) {
  if (err) {
    console.error(err.stack);
    return;
  }
});