const pg = require('pg');
require('dotenv').config({ quiet: true })

const db = new pg.Client({
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRESQL_DATABASE,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.POSTGRESQL_PORT
});

module.exports = db;