import { Command, CommandType } from './command.js';
import { Vector } from './../shapes/shapes.js';


class MoveCommand extends Command {
	constructor(props) {
		super(props);

		this.__type = CommandType.MOVE;
		this.__mergeable = true;
		
		if (typeof props.action != 'function') {
			this.__action = new Vector(props.action);
		}
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

		this.__action.add(command.getAction());
		return this;
	}

	getProps() {
		return {
			component_id: this.getComponentId(),
			action: this.getAction().getProps(),
			data: this.getData(),
			type: this.getType(),
			mergeable: this.mergeable(),
			ack: this.getAck(),
		}
	}
}

export { MoveCommand };

