
const CommandType = {
	// creatation command
	CREATION: 'creation',
	DESTRUCTION: 'destruction',
	CLONE: 'clone',


	// behavior command
	MOVE: "move",
	RESIZE: 'resize',
	ROTATION: 'rotation',
	
	NONE: 'none',
}

class Command {
	/**
	 * @var {Application}
	 */
	__application;

	/**
	 * @var {String}
	 */
	__component_id;
	__action;
	__data;

	/**
	 * @var {CommandType}
	 */
	__type;

	/**
	 * @var {boolean}
	 */
	__mergeable;

	__ack;

	constructor(props) {
		this.__application = props.application;
		this.__component_id = props.component_id;
		this.__action = props.action;
		this.__data = props.data;
		this.__type = props.type;
		this.__mergeable = props.mergeable;

		this.__ack = props.ack ? props.ack : false;
	}

	execute() {
		let component = this.getApplication().getComponentTree().getComponentById(this.getComponentId());

		if (!component) {
			return;
		}

		component.execute(this);
		this.__save();
	}

	__save() {
		if (!this.getApplication().getEventHandler()) {
			return;
		}
		// let event_handler = this.getApplication().getEventHandler();
		// let history_bufer = event_handler.getHistoryBuffer();
		// let peek_command = history_bufer.peek();

		// if (peek_command === null || !peek_command.isMergeable(this)) {
		// 	history_bufer.push(this);
		// } else {
		// 	peek_command.merge(this);
		// }

		if (!this.__ack) {
			let event_handler = this.getApplication().getEventHandler();
			let socket_client = event_handler.getSocketClient();
			let props = this.getProps();
			props.ack = true;
			socket_client.emit('edit', props);
		}
		
		this.__ack = true;
	}

	/**
	 * 
	 * @returns Command
	 */
	rev() {
		return this;
	}

	/**
	 * 
	 * @returns Command
	 */
	clone() {
		let clone = new Command({
			application: this.getApplication(),
			component_id: this.getComponentId(),
			action: this.getAction(),
			data: this.getData(),
			type: this.getType(),
			mergeable: this.mergeable(),
			ack: this.getAck(),
		});

		return clone;
	}

	/**
	 * 
	 * @param {Command} command
	 */
	merge(command) {
		return this;
	}

	getComponentId() {
		return this.__component_id;
	}

	getType() {
		return this.__type;
	}

	getAction() {
		return this.__action;
	}

	getApplication() {
		return this.__application;
	}

	/**
	 * 
	 * @param {Command} command 
	 * @returns boolean
	 */
	isMergeable(command) {
		if (!this.mergeable() || !command.mergeable() || this.getComponentId() != command.getComponentId() || this.getType() != command.getType()) {
			return false;
		}

		return true;
	}

	getData() {
		return this.__data;
	}

	mergeable() {
		return this.__mergeable;
	}

	/**
	 * 
	 * @param {boolean} mergeable 
	 */
	setMergeable(mergeable) {
		this.__mergeable = mergeable;
	}

	getAck() {
		return this.__ack;
	}

	getProps() {
		return {
			component_id: this.getComponentId(),
			action: this.getAction(),
			data: this.getData(),
			type: this.getType(),
			mergeable: this.mergeable(),
			ack: this.getAck(),
		}
	}
}


export { Command, CommandType };

