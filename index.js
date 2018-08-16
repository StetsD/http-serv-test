const Koa = require('koa'),
	app = new Koa(),
	{port} = require('./config'),
	{sequelize, Sequelize} = require('./db'),
	router = require('./ctrl');


router.init(app).bind(app);

app.listen(port);
