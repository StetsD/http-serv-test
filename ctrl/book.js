const book = require('../mdl/book');

let path = '/book';

module.exports = router => {
	router.get(path, async (ctx, next) => {
		ctx.body = await book.get();
	});

	router.post(path, (ctx, next) => {

	});

	router.patch(path, (ctx, next) => {

	})
}
