const DIALECT = 'mongodb';//'postgres';
const HOST = 'localhost';
// const PORT = 5432;
const DB = 'user';
const DB_USR = process.env.POSTGRES_USER;
const DB_PASS = process.env.POSTGRES_PASSWORD;

module.exports = {
  default: 3001,
  database: `${DIALECT}://${HOST}/${DB}`
  // database: `${DIALECT}://${DB_USR}:${DB_PASS}@${HOST}:${PORT}/${DB}`,
  // databaseDefault: `${DIALECT}://${DB_USR}:${DB_PASS}@${HOST}:${PORT}/${DIALECT}`
};