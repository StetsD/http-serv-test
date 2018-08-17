const Koa = require('koa'),
	app = new Koa(),
	{port} = require('./config'),
	{sequelize, Sequelize} = require('./db'),
	router = require('./ctrl'),
	fs = require('fs');

fs.readdirSync('./middlewares').forEach(middleware => {
	require(`./middlewares/${middleware}`).init(app);
});

router.init().bind(app);

app.listen(port);
