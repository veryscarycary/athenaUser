const DB_AUTH = require('./dbAuth.js');

const DIALECT = 'mongodb';//'postgres';
const HOST = 'localhost';
// const PORT = 5432;
const DB = 'user';
const DB_USR = process.env.DB_USR || DB_AUTH.DB_USR;
const DB_PASS = process.env.DB_PASS || DB_AUTH.DB_PASS;

module.exports = {
  default: 3001,
  database: `${DIALECT}://${HOST}/${DB}`
  // database: `${DIALECT}://${DB_USR}:${DB_PASS}@${HOST}:${PORT}/${DB}`,
  // databaseDefault: `${DIALECT}://${DB_USR}:${DB_PASS}@${HOST}:${PORT}/${DIALECT}`
};