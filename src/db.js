const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile');
const knex = require('knex');

module.exports = knex(knexConfig[environment]);