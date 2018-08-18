exports.init = app => app.use(async (ctx, next) => {
	try{
		await next();
	}catch(err){
		ctx.status = err.status || 500;
		
		switch(ctx.status){
			case 400:
				ctx.body = err;
				break;
			case 401:
				ctx.body = 'unauthorized';
				break;
			case 404:
				ctx.body = 'Not found 666';
				break;
			default:
				ctx.body = err;
				break;
		}
	}


});
