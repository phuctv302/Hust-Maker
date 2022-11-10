

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

class MariaDbSequelize {
	static instance;

	__sequelize;

	constructor() {
		this.__sequelize = new Sequelize(
			process.env.DB_NAME, 
			process.env.DB_USERNAME, 
			process.env.DB_PASSWORD, 
			{
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				dialect: 'mariadb',
		
				pool: {
					max: 5,
					min: 0,
					idle: 10000,
				}
			},
		);

		this.__sequelize
			.authenticate()
			.then(() => {
				console.log("Conecction has been established successfully.");
			})
			.catch((error) => {
				console.log("Unable to connect to the database: ", error);
			});
	}

	/**
	 * 
	 * @return {MariaDbSequelize}
	 */
	static getInstance() {
		if (!MariaDbSequelize.instance) {
			MariaDbSequelize.instance = new MariaDbSequelize();
		}
		return MariaDbSequelize.instance;
	}

	getSequelize() {
		return this.__sequelize;
	}

	sync() {
		this.__sequelize
			.sync()
			.then(() => {
				console.log("Tables created successfully");
			})
			.catch((err) => {
				console.log("Unable to create table: ", err);
			});
	}
}

export default MariaDbSequelize;
