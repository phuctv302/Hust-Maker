
import { Registry, Histogram, collectDefaultMetrics } from 'prom-client';

class Monitor {
	static instance;

	__register;

	constructor() {
		this.__register = new Registry();

		this.__register.setDefaultLabels({
			app: 'office-authoritative-server-nodejs'
		});

		let register = this.__register;
		collectDefaultMetrics({ register });
	}

	/**
	 * 
	 * @returns {Monitor}
	 */
	static getInstance() {
		if (!Monitor.instance) {
			Monitor.instance = new Monitor();
		}
		return Monitor.instance;
	}

	get = async (req, res) => {
		res.setHeader('Content-Type', this.__register.contentType);
		res.end(await this.__register.metrics());
	}
}

export default Monitor;

