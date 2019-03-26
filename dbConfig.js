// Import and configure knex for databases.
const knex  = require('knex');
const knexConfig = require('./knexfile');

module.exports = knex(knexConfig.development);