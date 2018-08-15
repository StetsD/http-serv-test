const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	database: 'http_serv_dev',
	username: 'root',
	password: '987654321Qq',
	port: 3306,
	dialect: 'mysql'
});
let {waterfall} = require('async'),
	authors = require('./semantic-core/author').content,
	text = require('./semantic-core/text').content,
	genContent = require('./libs/gen-content');

var Book = sequelize.define('Book', {
  title: Sequelize.STRING,
  date: Sequelize.DATE,
  author: Sequelize.STRING,
  description: Sequelize.TEXT,
  image: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

function generate(count){
	let res = [];

	for(let i = 0; i < count; i++){
		res.push({
			image: '/assets/img/books/plug.jpg',
			createdAt: new Date(),
			updatedAt: new Date(),
			...genContent({
				title: {type: 'string', min: 1, max: 4, content: text},
				date: {type: 'date', range: {year: {min: 1700, max: 2018}, month: {min: 1, max: 12}, date: {min: 1, max: 31}}},
				author: {type: 'string', min: 2, max: 2, content: authors},
				description: {type: 'text', min: 20, max: text.length, content: text}
			})
		});
	}

	return res;
}

function addPackage(packCount){
	if(packCount){
		Book.bulkCreate(generate(1000))
			.then(()=>{
				addPackage(packCount - 1);
			});
	}else{
		sequelize.close();
	}
}

addPackage(100);
