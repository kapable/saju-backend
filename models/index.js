const mansedata = require('./mansedata');
const s022 = require('./S022');
const s027 = require('./S027');
const s028 = require('./S028');
const s064 = require('./S064');
const s065 = require('./S065');
const s066 = require('./S066');
const s087 = require('./S087');
const s088 = require('./S088');
const s089 = require('./S089');
const s090 = require('./S090');
const s091 = require('./S091');
const s092 = require('./S092');
const s116 = require('./S116');
const s117 = require('./S117');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Mansedata = mansedata;
db.S022 = s022;
db.S027 = s027;
db.S028 = s028;
db.S064 = s064;
db.S065 = s065;
db.S066 = s066;
db.S087 = s087;
db.S088 = s088;
db.S089 = s089;
db.S090 = s090;
db.S091 = s091;
db.S092 = s092;
db.S116 = s116;
db.S117 = s117;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;