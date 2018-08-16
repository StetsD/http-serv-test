const {sequelize} = require('../db');

let type = sequelize.QueryTypes.SELECT;

async function get(){
	return await sequelize.query(`
		select b.id, b.title, b.date, b.description, b.image, b.author_id, a.name as author
		from books as b
		left join authors as a on b.author_id = a.id
		limit 30;
	`, {type});
}

module.exports = {
	get
}
