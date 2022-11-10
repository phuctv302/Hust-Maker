
import Monitor from '../controllers/moniter.js';
import Controller from './../controllers/controller.js';
import MapsController from './../controllers/maps.controller.js';


const router = (app) => {
	// Local Modules
	// const controller = require('../controllers/controller');
	// const maps_controller = require('../controllers/maps.controller');

	app.get('/', Controller.home);

	app.route('/api/v1/maps')
		.get(MapsController.get)
		.post(MapsController.store);

	app.route('/api/v1/maps/:mapId')
		.get(MapsController.detail)
		.put(MapsController.update)
		.delete(MapsController.delete);

	app.route('/metrics')
		.get(Monitor.getInstance().get)
};


export default router;


