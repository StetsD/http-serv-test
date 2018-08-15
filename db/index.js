const config = require('../config/config');
let {database, port, username, password} = config[process.env.NODE_ENV];
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	database,port,username,password,
	dialect: 'mysql'
});
