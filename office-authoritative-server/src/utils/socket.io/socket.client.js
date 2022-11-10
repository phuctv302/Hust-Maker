
import { io } from "./socket.io.4.3.2.js";


class SocketClient {
	__socket;
	__ip;
	__port;
	__token;
	
	constructor(props) {
		this.__ip = props.ip;
		this.__port = props.port;
		this.__token = props.token;
	
		console.log('create socket client');

		this.__socket = io.connect(this.__ip + ':' + this.__port);


		var that = this;
		this.__socket.on('connect', () => {
			console.log('connected');
			that.__socket.emit('authenticate', {token: that.__token});
		});
	}

	on(event, callback) {
		this.__socket.on(event, callback);
	}

	emit(event, data) {
		// console.log('emitting data', data);
		this.__socket.emit(event, data);	}
}

export { SocketClient };

