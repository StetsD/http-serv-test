let path = require('path'),
	fs = require('fs'),
	Router = require('koa-router'),
	router = new Router(),
	{validate, getState} = require('../libs/validation');

router.validate = validate;
router.getState = getState;

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
