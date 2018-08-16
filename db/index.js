const config = require('../config/config');
let {database, port, username, password} = config[process.env.NODE_ENV];
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	database, username, password, port,
	dialect: 'mysql',
	operatorsAliases: false
});
let db = {}


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
