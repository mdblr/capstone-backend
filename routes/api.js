'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const dotenv = require('dotenv').load();
const fetch = require('node-fetch');
const Area = require('../models/locdata');
const ReSrc = require('../models/orgdata');
const Help = require('../models/services');


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
    .then(geoLocResult => {
      geog = geoLocResult.results[0].geometry.location;
      return Area.search(geog.lat, geog.lng);
    })
    .then(loc_results => {
      return Promise.all(
        loc_results.rows.map(location => {
          return ReSrc.local(location.id)
            .then(organizations => {
              location.orgs = organizations;
              return Promise.all(
                location.orgs.map(org => {
                  return Help.services(org.id)
                    .then(services => {
                      org.services = services;
                      return org;
                    })
                }));
            })
        })).then(prox_services => {
        results = prox_services;
        res.json(results);
      })
    }).catch(err => {
      throw err;
    });
});

module.exports = router;
