'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET local resources */
router.get('/', (req, res, next) => {
  knex('locdata').select().then( data => {
    res.json(data);
  })
});

module.exports = router;
