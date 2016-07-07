knex = require('../db/knex');

const services = organization_id => {
  return knex('services').where({org_id: organization_id}).select('*')
}

module.exports = {
  services
};
