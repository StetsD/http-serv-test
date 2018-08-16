module.exports = {
    "development": {
        "username": "root",
        "password": "987654321Qq",
        "database": "http_serv_dev",
        "host": "localhost",
        "dialect": "mysql"
    },
    "test": {
		"username": process.env.db_username,
        "password": process.env.db_password,
        "database": process.env.db_name,
        "host": process.env.db_hostname,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.db_username,
        "password": process.env.db_password,
        "database": process.env.db_name,
        "host": process.env.db_hostname,
        "dialect": "mysql"
    }
}
