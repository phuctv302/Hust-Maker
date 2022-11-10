import { Command, CommandType } from './command.js';


class RotationCommand extends Command {
	constructor(props) {
		super(props);

		this.__type = CommandType.ROTATION;
		this.__mergeable = true;
	}

	/**
	 * 
	 * @returns Command
	 */
	clone() {
		let clone = new MoveCommand({
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
	 * @returns Self
	 */
	rev() {
		this.__action.rev();
		return this;
	}

	/**
	 * 
	 * @param {MoveCommand} command 
	 * @return Self 
	 */
	merge(command) {
		if (!this.isMergeable(command)) {
			return this;
		}

		this.__data.angle += command.getData().angle;
		return this;
	}

	getProps() {
		return {
			component_id: this.getComponentId(),
			action: null,
			data: this.getData(),
			type: this.getType(),
			mergeable: this.mergeable(),
			ack: this.getAck(),
		}
	}
}

export { RotationCommand };

