const author = require('../mdl/author');
const {rGet, rSet, eDel} = require('../libs/redisio');

module.exports = router => {
	router.get(PATH, async (ctx, next) => {
		let cache = await rGet(PATH);
		if(cache){
			ctx.body = JSON.parse(cache);
		}else{
			let authors = await author.get();
			rSet(PATH, `${JSON.stringify(authors)}`, 20);
			ctx.body = authors;
		}
	});

	router.post(PATH, async (ctx, next) => {
		if(router.validate(V_FIELDS, ctx.request.body)){
			let {name, bio} = ctx.request.body;
			await author.post({name, bio});
			eDel(PATH);
			ctx.body = {name, bio};
		}else{
			ctx.throw(400, {fields: router.getState()});
		}
	});

	router.patch(`${PATH}/:id`, async (ctx, next) => {
		if(router.validate(V_FIELDS, ctx.request.body)){
			let {name, bio} = ctx.request.body;
			await author.patch({name, bio, id: ctx.params.id});
			ctx.body = {name, bio};
		}else{
			ctx.throw(400, {fields: router.getState()});
		}
	});
}

const PATH = '/author';
const V_FIELDS = [
	{
		name: 'name',
		type: 'required'
	},
	{
		name: 'bio',
		type: 'required'
	}
];
