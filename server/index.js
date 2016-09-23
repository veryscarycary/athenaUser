const chalk = require('chalk');
const url = require('./urls.js');

//set port to default port or POST variable provided by user
const port = process.argv[2] || require('./urls.js').defaultPort; 

//set server to listen to port
require('./server.js').listen(port, () => 
  console.log(chalk.green.bold(`Athena User RESTful API listening on port ${port}.`)));