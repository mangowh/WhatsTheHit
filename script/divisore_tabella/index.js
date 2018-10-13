"use strict";

require("dotenv").config({ path: __dirname + '/dot.env' });
var mysql = require('mysql');

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

var query = "SELECT * FROM completo LIMIT 10;";
connection.query(query, function (error, results, fields) {
  if (error) throw error;

  if (typeof (results) === "undefined") {
    console.log("Insieme vuoto");
  } else {
    console.log(JSON.parse(JSON.stringify(results)));
  }
});

connection.end(function(err) {
  if (err) {
    console.error(err.stack);
    return;
  }
});