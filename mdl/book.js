const {sequelize} = require('../db');

let type = sequelize.QueryTypes.SELECT;

async function get(){
	return await sequelize.query(`
		SELECT b.id, b.title, b.date, b.description, b.image, b.author_id, a.name AS author
		FROM books AS b
		LEFT JOIN authors AS a ON b.author_id = a.id
		LIMIT 30;
	`, {type});
}

async function post({title, date, description, image, author_id}){
	return await sequelize.query(`
		INSERT INTO books (title, date, description, image, author_id)
		VALUES ('${title}', '${date}', '${description}', '${image}', '${author_id}');
	`);
}

async function patch({id, title, date, description, image, author_id}){
	return await sequelize.query(`
		UPDATE books
		SET title = '${title}', date = '${date}', description = '${description}',
		image = '${image}', author_id = '${author_id}'
		WHERE id = '${id}';
	`)
}

module.exports = {
	get, post, patch
}
