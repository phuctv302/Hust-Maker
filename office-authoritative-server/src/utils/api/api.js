
class API {
	/**
	 * 
	 * @param {Command} command 
	 */
	static sendCommand(command) {
		console.log("send command: ", command.getProps());

		AP.post('api/v1/command/save', {
			props: command.getProps(),
		}, (code) => {
			if (!code.good()) {
				console.log("error", code.message);
				return;
			}
			console.log('message', code.message, code.props);
		});
	}
}

export { API };
