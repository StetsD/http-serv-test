const body = require('koa-body');

exports.init = app => {
	app.use(body({
		multipart: true
	}));
};


// const parser = require('koa-bodyparser');
// // const body = require('koa-body');
// // const {limits} = require('../config');
// exports.init = app => {
// 	app.use(parser());
// 	// app.use(body({
// 	// 	multipart: true,
// 	// 	formidable: {
// 	// 		maxFileSize: limits.chatFile
// 	// 	}
// 	// }));
// };
