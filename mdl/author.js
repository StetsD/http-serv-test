const {sequelize} = require('../db');

let type = sequelize.QueryTypes.SELECT;

async function get(){
	return await sequelize.query(`
		SELECT *
		FROM authors
		LIMIT 30;
	`, {type});
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
