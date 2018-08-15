let authors = require('./content/author'),
	text = require('./content/text');

function generator(min, max, content){
	let res = '',
		outputLgt = aligner(randomizer, min, max),
		cntLgt = content.length;

	for(let i = 0; i < outputLgt; i++){
		res += `${content[randomizer(cntLgt)]} `;
	}

	return res;
}

function generatorDate(range){
	function genYear({min, max}){
		let outputLgt = randomizer(max);
		return outputLgt > min ? outputLgt : min + randomizer(max-min);
	}
	function genMonth({min, max}){
		let month = aligner(randomizer, min, max);
		return dateFormater(month);
	}
	function genDate({min, max}){
		let date = aligner(randomizer, min, max);
		return dateFormater(date);
	}

	return `${genYear(range.year)}-${genMonth(range.month)}-${genDate(range.date)}`
}

function randomizer(lgt){
	return +(Math.random() * lgt).toFixed(0);
}

function aligner(func, min, max){
	let outputLgt = func(max) || min;
	return outputLgt > min ? outputLgt : min;
}

function dateFormater(num){
	return num > 9 ? num : `0${num}`;
}

function capitalizer(str){

}

function ender(str, sign){

}

function genContent(fields){
	let res = {};

	for(let key in fields){
		let elem = fields[key];

		switch (elem.type) {
			case 'string':
				res[key] = generator(elem.min, elem.max, elem.content);
				break;
			case 'text':
				res[key] = generator(elem.min, elem.max, elem.content);
				break;
			case 'date':
				res[key] = generatorDate(elem.range);
				break;
			default:
				break;
		}
	}

	return res;
}


console.log(genContent({
	title: {type: 'string', min: 1, max: 4, content: text.content},
	date: {type: 'date', range: {year: {min: 1700, max: 2018}, month: {min: 1, max: 12}, date: {min: 1, max: 31}}},
	author: {type: 'string', min: 2, max: 2, content: authors.content},
	description: {type: 'text', min: 20, max: text.content.length, content: text.content}
}));
