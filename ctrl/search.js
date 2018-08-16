let path = '/search';

module.exports = router => {
	router.get(path, (ctx, next) => {
		ctx.body = 'get search';
	});

	router.post(path, (ctx, next) => {

	});

	router.patch(path, (ctx, next) => {

	})
}
