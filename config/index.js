module.exports = {
	port: process.env.port || 8000,
	redis: {
		host: process.env.redis_host || '127.0.0.1',
		port: process.env.redis_port || 6379
	},
}
