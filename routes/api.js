'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const dotenv = require('dotenv').load();
const fetch = require('node-fetch');

const filter = match => {
  return match === ' ' ? '+' : '';
}

let geog, results;
let geoLocReq = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json?',
  key: `&key=${process.env.GOOG_KEY}`
}

/* post user's address */

router.post('/nearby', (req, res, next) => {
  geoLocReq.addr = `address=${req.body.addr.replace(/ ||([.])/g, filter)}`;

  fetch(`${geoLocReq.url + geoLocReq.addr + geoLocReq.key}`)
    .then(result => {

      return result.json();
    })
    .then(geoLocRes => {
      console.log(geoLocRes);
      geog = geoLocRes.results[0].geometry.location;
      return knex.raw(
        `SELECT * FROM
          ( SELECT id, lat, long,
            ( 3959 * acos(
              cos( radians( ${geog.lat} )) * cos( radians(lat)) *
              cos( radians(long) - radians( ${geog.lng} ) ) +
              sin( radians( ${geog.lat} )) * sin( radians(lat))))
              AS distance FROM locdata)
              AS distances
              WHERE distance < 1
              ORDER BY distance
              OFFSET 0
              LIMIT 15;`);
    }).then(knex_data => {
      console.log(knex_data);
      results = knex_data.rows;
      res.json(results);
    });
});

module.exports = router;
