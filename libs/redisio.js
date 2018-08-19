const {redis: r} = require('../config');
const bb = require('bluebird');
const redis = require('redis');
bb.promisifyAll(redis.RedisClient.prototype);

const cli = redis.createClient({
	host: r.host,
	port: r.port
});

cli.on('connect', () => {
	console.log('REDIS CLIENT CONNECTED');
});

cli.on('reconnecting', () => {
	console.log('REDIS RECONNECTING');
});

cli.on('error', err => {
	console.error("REDIS ERROR: ", err);
});

exports.rSet = async (key, val, expire) => {
	await cli.set(key, val, 'EX', expire);
}

exports.rGet = async (key) => {
	return await cli.getAsync(key);
}

exports.eDel = (key) => {
	return cli.del(key);
}

exports.cli = cli;
