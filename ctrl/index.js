let path = require('path'),
	fs = require('fs'),
	Router = require('koa-router'),
	router = new Router();

module.exports.init = () => {
	fs.readdirSync(__dirname).forEach(route => {
		route !== 'index.js' &&
		require(path.resolve(__dirname, route))(router);
	});

	return this;
}

module.exports.bind = app => {
	app.use(router.routes());
	return this;
}
