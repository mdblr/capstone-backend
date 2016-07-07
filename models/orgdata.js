knex = require('../db/knex');

const local = location_id => {
  return knex('orgdata').where({loc_id: location_id}).select('*');
}

module.exports = {
  local
};
