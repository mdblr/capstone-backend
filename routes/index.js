'use strict';

const express = require('express');
const router = express.Router();
const api = require('../routes/api')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/api', api);

module.exports = router;
