let path = require('path'),
	fs = require('fs'),
	router = new require('koa-router')();

module.exports.init = app => {
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
