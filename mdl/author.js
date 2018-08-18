const {sequelize} = require('../db');

let type = sequelize.QueryTypes.SELECT;
const LIMIT = 100;

async function get({q, limit} = {}){
	var query = '';

	if(q){
		query = `SELECT DISTINCT *
				FROM authors
				WHERE LOWER(name) LIKE LOWER('%${q}%')
				LIMIT ${limit ? limit : LIMIT};`;
	}else{
		query = `SELECT *
				FROM authors
				LIMIT ${limit ? limit : LIMIT};`;
	}

	return await sequelize.query(query, {type});
}

async function post({name, bio}){
	return await sequelize.query(`
		INSERT INTO authors (name, bio)
		VALUES ('${name}', '${bio}');
	`);
}

async function patch({id, name, bio}){
	return await sequelize.query(`
		UPDATE authors
		SET name = '${name}', bio = '${bio}'
		WHERE id = '${id}';
	`)
}

module.exports = {
	get, post, patch
}
