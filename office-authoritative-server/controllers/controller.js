// Methods to be executed on routes
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const path = require('path');


class Controller {
	static home = (req, res)=>{
		res.sendFile(path.resolve(__dirname + '/../views/index.html'));
	}
}

// Export of all methods as object
export default Controller;

