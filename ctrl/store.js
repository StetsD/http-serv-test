let path = '/store';

module.exports = router => {
	router.get(path, (ctx, next) => {
		ctx.body = 'get store';
	});

	router.post(path, (ctx, next) => {

	});

	router.patch(path, (ctx, next) => {

	})
}
