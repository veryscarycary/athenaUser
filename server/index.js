const chalk = require('chalk');
//set port to default port or POST variable provided by user
const port = process.argv[2] || require('./urls.js').default; 

//set server to listen to port
require('./server.js').listen(port, () => 
  console.log(chalk.green.bold(`Athena User RESTful API listening on port ${port}.`)));