const mw = require('../config/middleware.js');
const Sequelize = mw.sequelize;
const schemaName = 'user_schema';
const db = new Sequelize('', '', '', {dialect :'postgres', port:'5432',schema: schemaName});

// let Kb = db.define('Kb', {
  
// })
