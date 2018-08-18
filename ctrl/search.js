let fs = require('fs'),
	path = require('path'),
	{forIn, keys} = require('lodash');

let mdls = {};

fs.readdirSync(path.resolve(process.cwd(), 'mdl'))
.forEach(item => {
	if(!item.match(/.js$/g)){return;}
	mdls[item.slice(0, -3)] = require(path.resolve(process.cwd(), 'mdl', item));
});

module.exports = router => {
	router.get(PATH, async (ctx, next) => {
		let {q} = ctx.request.query;

		if(q){
			let res = {};
			let thr = [];

			forIn(mdls, (val, key) => {
				thr.push(new Promise(async (resolve, reject)=>{
					let pack = await mdls[key].get({q});
					resolve({[key]:pack});
				}));
			});

			let allPacks = await Promise.all(thr);
			allPacks.forEach(item => {
				let key = keys(item)[0];
				res[key] = item[key];
			});

			ctx.body = res;
		}else{
			next();
		}
	});
}

const PATH = '/search';
