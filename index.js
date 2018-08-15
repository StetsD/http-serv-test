const Koa = require('koa');
const app = new Koa();
const {port} = require('./config');

app.use(async ctx => {
	ctx.body = "Hello Workl";
});

app.listen(port);
