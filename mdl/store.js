const {sequelize} = require('../db');

let type = sequelize.QueryTypes.SELECT;
const LIMIT = 100;

async function get({q, limit} = {}){
	var query = '';

	if(q){
		query = `SELECT DISTINCT *
				FROM stores
				WHERE LOWER(name) LIKE LOWER('%${q}%')
				LIMIT ${limit ? limit : LIMIT};`;
	}else{
		query = `SELECT *
				FROM stores
				LIMIT ${limit ? limit : LIMIT};`;
	}

	return await sequelize.query(query, {type});
}

async function post({name, address}){
	return await sequelize.query(`
		INSERT INTO stores (name, address)
		VALUES ('${name}', '${address}');
	`);
}

async function patch({id, name, address}){
	return await sequelize.query(`
		UPDATE stores
		SET name = '${name}', address = '${address}'
		WHERE id = '${id}';
	`)
}

module.exports = {
	get, post, patch
}
