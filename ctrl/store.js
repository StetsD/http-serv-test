const store = require('../mdl/store');

module.exports = router => {
	router.get(PATH, async (ctx, next) => {
		ctx.body = await store.get();
	});

	router.post(PATH, async (ctx, next) => {
		if(router.validate(V_FIELDS, ctx.request.body)){
			let {name, address} = ctx.request.body;
			await store.post({name, address});
			ctx.body = {name, address};
		}else{
			ctx.throw(400, {fields: router.getState()});
		}
	});

	router.patch(`${PATH}/:id`, async (ctx, next) => {
		if(router.validate(V_FIELDS, ctx.request.body)){
			let {name, address} = ctx.request.body;
			await store.patch({name, address, id: ctx.params.id});
			ctx.body = {name, address};
		}else{
			ctx.throw(400, {fields: router.getState()});
		}
	});
}

const PATH = '/store';
const V_FIELDS = [
	{
		name: 'name',
		type: 'required'
	},
	{
		name: 'address',
		type: 'required'
	}
];
