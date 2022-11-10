


import redis from 'redis';
import { promisify } from 'util';

import dotenv from 'dotenv';
dotenv.config({path: "./../../.env"});


class Redis {
	//
	static instance;

	__client;
	__setAsync;
	__getAsync;

	constructor() {
		this.__client = redis.createClient({
			legacyMode: true,
			url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
		});
		this.__client.on('error', (err) => console.log(`[!] Redis error: ${err}`));
	}

	async connect() {
		await this.__client.connect()

		console.log('[*] Redis connect successfully!');
		this.__setAsync = promisify(this.__client.set).bind(this.__client);
		this.__getAsync = promisify(this.__client.get).bind(this.__client);
	}

	static async getInstance() {
		if (!Redis.instance) {
			Redis.instance = new Redis();
			await Redis.instance.connect();
		}

		return Redis.instance;
	}

	async set(key, value) {
		await this.__setAsync(key, value);

		// TODO:
		// const TIME_TO_LIVE_IN_SECONDS = 3600;
		// this.expire(key, TIME_TO_LIVE_IN_SECONDS);
	}

	async get(key) {
		return await this.__getAsync(key);
	}

	expire(key, time_in_seconds) {
		this.__client.expire(key, time_in_seconds);
	}
}

export { Redis };
