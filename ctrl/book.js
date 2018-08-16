let path = '/book';

module.exports = router => {
	router.get(path, (ctx, next) => {
		ctx.body = 'get books';
	});

	router.post(path, (ctx, next) => {

	});

	router.patch(path, (ctx, next) => {

	})
}
