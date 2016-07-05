'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET local resources */
router.get('/', (req, res, next) => {
  knex.raw("SELECT * FROM (SELECT id, lat, long, (3959 * acos(cos(radians(47.598962)) * cos(radians(lat)) * cos(radians(long) - radians(-122.333799)) + sin(radians(47.598962)) * sin(radians(lat)))) AS distance FROM locdata) AS distances WHERE distance < 1 ORDER BY distance OFFSET 0 LIMIT 15;")
  .then( data => {
    res.json(data);
  })
});

module.exports = router;
