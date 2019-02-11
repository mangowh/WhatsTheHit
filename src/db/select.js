const debug = require("debug")("whatsthehit:api/select"),
  createError = require('http-errors'),
  knex = require("../config/knex.js")

module.exports = (req, res, next) => {
  var query = knex();

  //FROM
  if (Array.isArray(req.body.from)) {
    if (req.body.from.length == 2) {
      switch (req.body.from) {
        case (["canzone", "artista"]):
        case (["artista", "canzone"]):
        query.from("artista")
          .innerJoin('associazione_artista_canzone', 'artista.id', 'associazione_artista_canzone.artista_id')
          .innerJoin('canzone', 'canzone.id', 'associazione_artista_canzone.canzone_id')
      }
    }
  } else {
    query = knex.from(req.body.from);
  }

  //SELECT
  if (req.body.select) {
    query.select(req.body.select);
  } else {
    query.select(); 
  }

  //WHERE
  if (req.body.where) {
    var dove = req.body.where;

    for (var key in dove) {
      if (Array.isArray(dove[key])) {
        query.whereBetween(key.toString(), dove[key])
      } else {
        var valore = dove[key].toString();

        if (valore.substring(0, 1) == ">=" || valore.substring(0, 1) == "<=") {
          query.where(key, valore.substring(0, 1), valore.substring(2))
        } else if (valore[0] == ">" || valore[0] == "<") {
          query.where(key, valore[0], valore.substring(1))
        } else {
          query.where(key, dove[key])
        }
      }
    }
  }

  //ORDER BY
  if (req.body.orderby) {
    if (req.body.desc) {
      query.orderBy(req.body.orderby, "desc")
    } else {
      query.orderBy(req.body.orderby)
    }
  }

  //LIMIT
  if (req.body.limit) {
    query.limit(req.body.limit)
  }

  query.then((rows) => res.send(rows))
    .catch((err) => {
      debug(err)
      next(createError(err.status))
    });
};