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

	return `${genYear(range.year)}-${genMonth(range.month)}-${genDate(range.date)} 00:00:00`
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
	return str[0].toUpperCase() + str.slice(1);
}

function ender(str, sign){
	return str.slice(0, str.length-1) + sign;
}

function genContent(fields){
	let res = {};

	for(let key in fields){
		let elem = fields[key];

		switch (elem.type) {
			case 'string':
				res[key] = capitalizer(
					ender(
						generator(elem.min, elem.max, elem.content),
						''
					)
				);
				break;
			case 'text':
				res[key] = capitalizer(
					ender(
						generator(elem.min, elem.max, elem.content),
						'.'
					)
				);
				break;
			case 'date':
				res[key] = generatorDate(elem.range);
				break;
			case 'number':
				res[key] = aligner(randomizer, elem.min, elem.max);
				break;
			default:
				break;
		}
	}

	return res;
}

module.exports = genContent;
