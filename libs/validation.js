const univalid = require('univalid')();

exports.validate = (rules, fields) => {
	univalid.check( _mergeRulesFields(rules, fields));
	let state = univalid.getCommonState;
	if(state === 'success'){
		univalid.clearState();
		return true;
	}else{
		return false;
	}
}

exports.getState = () => {
	return univalid.getState;
}

function _mergeRulesFields(r, f){
	return r.map(item => {
	 	item.val = f[item.name] || '';
		return item;
	});
}
