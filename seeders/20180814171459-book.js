'use strict';

let {fill} = require('lodash'),
	authors = require('../semantic-core/author').content,
	text = require('../semantic-core/text').content,
	genContent = require('../libs/gen-content');

let res = [];

for(let i = 0; i < 1000; i++){
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

module.exports = {
    up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Books', res, {});
	},

    down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Books', null, {});
    }
};
