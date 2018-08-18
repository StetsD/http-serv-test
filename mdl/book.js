const {sequelize} = require('../db');

let type = sequelize.QueryTypes.SELECT;
const LIMIT = 100;

async function get({q, limit} = {}){
	var query = '';

	if(q){
		query = `SELECT DISTINCT b.id, b.title, b.date, b.description, b.image, b.author_id, a.name AS author
				FROM books AS b
				LEFT JOIN authors AS a ON b.author_id = a.id
				WHERE LOWER(title) LIKE LOWER('%${q}%')
				LIMIT ${limit ? limit : LIMIT};`;
	}else{
		query = `SELECT b.id, b.title, b.date, b.description, b.image, b.author_id, a.name AS author
				FROM books AS b
				LEFT JOIN authors AS a ON b.author_id = a.id
				LIMIT ${limit ? limit : LIMIT};`;
	}

	return await sequelize.query(query, {type});
}

async function post({title, date, description, image, author_id}){
	return await sequelize.query(`
		INSERT INTO books (title, date, description, image, author_id, createdAt, updatedAt)
		VALUES ('${title}', '${date}', '${description}', '${image}', '${author_id}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
	`);
}

async function patch({id, title, date, description, image, author_id}){
	return await sequelize.query(`
		UPDATE books
		SET title = '${title}', date = '${date}', description = '${description}',
		image = '${image}', author_id = '${author_id}', updatedAt=CURRENT_TIMESTAMP
		WHERE id = '${id}';
	`)
}

module.exports = {
	get, post, patch
}
