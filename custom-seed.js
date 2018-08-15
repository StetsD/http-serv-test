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
	cities = require('./semantic-core/cities').content,
	genContent = require('./libs/gen-content');

var Book = sequelize.define('Book', {
  title: Sequelize.STRING,
  date: Sequelize.DATE,
  description: Sequelize.TEXT,
  image: Sequelize.STRING,
  author_id: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

var Author = sequelize.define('Author', {
  name: Sequelize.STRING,
  bio: Sequelize.TEXT,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

var Store = sequelize.define('Store', {
  name: Sequelize.STRING,
  address: Sequelize.TEXT,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

var BookToStore = sequelize.define('Book_to_Store', {
  book_id: Sequelize.INTEGER,
  store_id: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

Book.belongsTo(Author);

function generate(count, type){
	let res = [];

	for(let i = 0; i < count; i++){
		if(type === 'author'){
			res.push({
				createdAt: new Date(),
				updatedAt: new Date(),
				...genContent({
					name: {type: 'string', min: 2, max: 2, content: authors},
					bio: {type: 'text', min: 20, max: 50, content: text}
				})
			});
		}else if(type === 'book'){
			res.push({
				image: '/assets/img/books/plug.jpg',
				createdAt: new Date(),
				updatedAt: new Date(),
				...genContent({
					title: {type: 'string', min: 1, max: 4, content: text},
					date: {type: 'date', range: {year: {min: 1700, max: 2018}, month: {min: 1, max: 12}, date: {min: 1, max: 31}}},
					author_id: {type: 'number', min: 1, max: 1000, content: authors},
					description: {type: 'text', min: 20, max: text.length, content: text}
				})
			});
		}else if(type === 'store'){
			res.push({
				createdAt: new Date(),
				updatedAt: new Date(),
				...genContent({
					name: {type: 'string', min: 2, max: 3, content: text},
					address: {type: 'text', min: 1, max: 3, content: cities},
				})
			});
		}else if(type === 'book_to_store'){
			res.push({
				createdAt: new Date(),
				updatedAt: new Date(),
				...genContent({
					book_id: {type: 'number', min: 1, max: 10000},
					store_id: {type: 'number', min: 1, max: 100},
				})
			});
		}

	}

	return res;
}

async function addPackage(model, packCount, packLgt, type){
	return new Promise((res, rej) => {

		function addPackageLoc(model, packCount, packLgt, type){
			var item;

			if(packCount){
				model.bulkCreate(generate(packLgt, type))
					.then(()=>{
						addPackageLoc(model, packCount - 1, packLgt, type);
					});
			}else{
				res();
			}
		};

		addPackageLoc(model, packCount, packLgt, type);
	})
}

(async ()=>{
	await Author.sync({force: true});
	await Book.sync({force: true});
	await Store.sync({force: true});
	await BookToStore.sync({force: true});

	await addPackage(Author, 10, 100, 'author');
	await addPackage(Book, 10, 1000, 'book');
	await addPackage(Store, 1, 100, 'store');
	await addPackage(BookToStore, 100, 1000, 'book_to_store');

	sequelize.close();
})();
