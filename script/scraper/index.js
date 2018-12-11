const fs = require("fs");
const rp = require("request-promise");
const cheerio = require('cheerio');

var $,
  link = "http://www.hitparadeitalia.it/hp_yends/hpe",
  anno = 1947

//for (anno; anno <= 2016; anno++) {
rp(link.concat(anno.toString(), ".htm"), { encoding: "latin1" })
  .then((html) => {
    scriviFile(parsaHTML(html))
  })
  .catch((err) => console.log(err))
//}

function parsaHTML(html) {
  $ = cheerio.load(html, {
    normalizeWhitespace: true,
    decodeEntities: true
  });

  var scrape = $("ol li").map((i, elem) => {
    return $(elem).text();
  }).get().join(" ");

  var formattato = scrape.toString()
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
    .trim()

  return formattato
}

function scriviFile(testo) {
  fs.writeFileSync("output.txt", testo);

  var output = '"titolo","artista"\n' + testo;

  output = output
    .replace(/(.*?) - /gu, '"$1" - ')
    .replace(/ - (.*)/gu, ' - "$1"')
    .replace(/ - /gu, ",")

  fs.writeFileSync("output.csv", output);
}