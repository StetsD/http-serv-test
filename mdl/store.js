const {sequelize} = require('../db');

let type = sequelize.QueryTypes.SELECT;

async function get(){
	return await sequelize.query(`
		SELECT *
		FROM stores
		LIMIT 30;
	`, {type});
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
