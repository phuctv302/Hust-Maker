// Methods to be executed on routes
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Redis } from '../src/server.side/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const path = require('path');


// Export of all methods as object
// module.exports = {
//     get: (req, res) => {
// 		let response = {
// 			response: "success get",
// 		};
	
// 		res.json(response);
// 	},
	
// 	detail: (req, res) => {
// 		let map_id = req.params.mapId;

// 		let response = {
// 			response: "success detail " + map_id,
// 		};
		
// 		res.json(response);
// 	},
	
// 	store: (req, res) => {
// 		let response = {
// 			response: "success store",
// 		};
		
// 		res.json(response);
// 	},

// 	update: (req, res) => {
// 		let map_id = req.params.mapId;

// 		let response = {
// 			response: "success update " + map_id,
// 		};
		
// 		res.json(response);
// 	},
	
// 	delete: (req, res) => {
// 		let map_id = req.params.mapId;

// 		let response = {
// 			response: "success delte " + map_id,
// 		};
		
// 		res.json(response);
// 	}
// };

class MapsController {
	static get = async (req, res) => {

		let redis_instance = await Redis.getInstance();
		let map_0 = await redis_instance.get('map_0');
		map_0 = map_0 ? map_0 : '[]';

		map_0 = JSON.parse(map_0);

		let commands = [];

		for (const component_id of map_0) {
			let props = await redis_instance.get(component_id);
			commands.push(props)
		}
		let response = {
			commands: commands,
		};
	
		res.json(response);
	}

	static detail = (req, res) => {
		let map_id = req.params.mapId;
	
		let response = {
			response: "success detail " + map_id,
		};
		
		res.json(response);
	}

	static store = (req, res) => {
		let response = {
			response: "success store",
		};
		
		res.json(response);
	}

	static update = (req, res) => {
		let map_id = req.params.mapId;
	
		let response = {
			response: "success update " + map_id,
		};
		
		res.json(response);
	}

	static delete = (req, res) => {
		let map_id = req.params.mapId;
	
		let response = {
			response: "success delte " + map_id,
		};
		
		res.json(response);
	}
}


export default MapsController;
