const store = require('../mdl/store');
const {rGet, rSet, eDel} = require('../libs/redisio');

module.exports = router => {
	router.get(PATH, async (ctx, next) => {
		let cache = await rGet(PATH);
		if(cache){
			ctx.body = JSON.parse(cache);
		}else{
			let stores = await store.get();
			rSet(PATH, `${JSON.stringify(stores)}`, 20);
			ctx.body = stores;
		}
	});

	router.post(PATH, async (ctx, next) => {
		if(router.validate(V_FIELDS, ctx.request.body)){
			let {name, address} = ctx.request.body;
			await store.post({name, address});
			eDel(PATH);
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
