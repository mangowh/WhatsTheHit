"use strict";

const fs = require("fs");
const request = require("sync-request");
const cheerio = require('cheerio');

var link = "http://www.hitparadeitalia.it/hp_yends/hpe";

if (fs.existsSync("output.csv")) {
  fs.unlinkSync("output.csv")
}

fs.writeFileSync("output.csv", '"posizione","titolo","artista","anno"\r\n')

var annoIniziale = 1947;
var annoFinale = 2016;

var anno = 1997
for (var anno = annoIniziale; anno <= annoFinale; anno++) {
  var html = request("GET", link.concat(anno.toString(), ".htm")).getBody('latin1');

  var $ = cheerio.load(html, {
    normalizeWhitespace: true,
    decodeEntities: true
  });

  var scrape = $("ol li").map((i, elem) => {
    return $(elem).text();
  }).get().join(" ");

  var testo = scrape.toString()
    .replace(/\n\n/gu, "")
    .replace(/    /gu, "")
    .replace(/   /gu, "")
    .replace(/\n\s/gu, "")
    .replace(/\s\((.*?)\)\s/gu, "")
    .replace(/\[(.*?)\]/gu, "")
    .replace(/\s\n/gu, "\n")
    .replace(/\s\s/gu, "\n")
    .replace(/(\S)- /gu, "$1 - ")
    .replace(/\n (\S)/gu, "\n$1")
    .replace(/\n\n/gu, "\n")
    .replace(/\n-/gu, " -")
    .replace(/"/gu, "'")
    .replace(/\n\n/gu, "\n")
    .trim()

  var diviso = testo.split("\n");

  if (anno == 1997) {
    diviso.splice(0, 1)
  }

  for (let i = 0; i < diviso.length; i++) {
    diviso[i] = (i + 1).toString() + " : " + diviso[i] + " ; " + anno.toString()
  }

  var output = diviso.join("\r\n");

  output = output
    .replace(/(\d*) : (.*?) - /gu, '"$1","$2" - ')
    .replace(/ - (.*) ; (\d*)/gu, ' - "$1","$2"')
    .replace(/ - /gu, ",")

  if (anno == annoIniziale)
    fs.appendFileSync("output.csv", output)
  else
    fs.appendFileSync("output.csv", "\r\n" + output)

  console.log("Anno " + anno + "...")
}

console.log("Completato!")