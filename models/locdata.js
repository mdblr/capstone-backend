knex = require('../db/knex');

const search = (geogLat, geogLng) => {
  return knex.raw(
    `SELECT * FROM
      ( SELECT id, lat, long,
        ( 3959 * acos(
          cos( radians( ${geogLat} )) * cos( radians(lat)) *
          cos( radians(long) - radians( ${geogLng} )) +
          sin( radians( ${geogLat} )) * sin( radians(lat))))
          AS distance FROM locdata)
          AS distances
          WHERE distance < 1
          ORDER BY distance
          OFFSET 0
          LIMIT 15;`);
}

module.exports = {
  search
};
