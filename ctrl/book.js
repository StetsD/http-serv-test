const book = require('../mdl/book');
const {rGet, rSet, eDel} = require('../libs/redisio');

module.exports = router => {
	router.get(PATH, async (ctx, next) => {
		let cache = await rGet(PATH);
		if(cache){
			ctx.body = JSON.parse(cache);
		}else{
			let books = await book.get();
			rSet(PATH, `${JSON.stringify(books)}`, 20);
			ctx.body = books;
		}
	});

	router.post(PATH, async (ctx, next) => {
		if(router.validate(V_FIELDS, ctx.request.body)){
			let {title, date, description, image, author_id} = ctx.request.body;
			await book.post({title, date, description, image, author_id});
			eDel(PATH);
			ctx.body = {title, date, description, image, author_id};
		}else{
			ctx.throw(400, {fields: router.getState()});
		}
	});

	router.patch(`${PATH}/:id`, async (ctx, next) => {
		if(router.validate(V_FIELDS, ctx.request.body)){
			let {title, date, description, image, author_id} = ctx.request.body;
			await book.patch({title, date, description, image, author_id, id: ctx.params.id});
			ctx.body = {title, date, description, image, author_id};
		}else{
			ctx.throw(400, {fields: router.getState()});
		}
	});
}

const PATH = '/book';
const V_FIELDS = [
	{
		name: 'title',
		type: 'required'
	},
	{
		name: 'date',
		type: 'required'
	},
	{
		name: 'description',
		type: 'required'
	},
	{
		name: 'image',
		type: 'required'
	},
	{
		name: 'author_id',
		type: 'required'
	}
];
