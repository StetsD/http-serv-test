const book = require('../mdl/book');
const univalid = require('univalid')();

const PATH = '/book';

module.exports = router => {
	router.get(PATH, async (ctx, next) => {
		ctx.body = await book.get();
	});

	router.post(PATH, async (ctx, next) => {
		if(validate(ctx.request.body)){
			let {title, date, description, image, author_id} = ctx.request.body;
			await book.post({title, date, description, image, author_id});
			ctx.body = {title, date, description, image, author_id};
		}else{
			ctx.throw(400, {fields: univalid.getState});
		}
	});

	router.patch(PATH, async (ctx, next) => {
		if(validate(ctx.request.body)){
			let {title, date, description, image, author_id} = ctx.request.body;
			await book.patch({title, date, description, image, author_id, id: ctx.request.body.id});
			ctx.body = {title, date, description, image, author_id, id: ctx.request.body.id};
		}else{
			ctx.throw(400, {fields: univalid.getState});
		}
	});
}

function validate(body){
	univalid.check([
		{
			name: 'title',
			val: body.title,
			type: 'required'
		},
		{
			name: 'date',
			val: body.date,
			type: 'required'
		},
		{
			name: 'description',
			val: body.description,
			type: 'required'
		},
		{
			name: 'image',
			val: body.image,
			type: 'required'
		},
		{
			name: 'author_id',
			val: body.author_id,
			type: 'required'
		}
	]);
	let state = univalid.getCommonState;
	if(state === 'success'){
		univalid.clearState();
		return true;
	}else{
		return false;
	}

}
