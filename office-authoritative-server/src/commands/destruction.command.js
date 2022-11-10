import { Command, CommandType } from './command.js';

class DestructionCommand extends Command {
	constructor(props) {
		super(props);

		this.__type = CommandType.DESTRUCTION;
		this.__mergeable = false;
		
	}

	/**
	 * 
	 * @returns Command
	 */
	clone() {
		let clone = new DestructionCommand({
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
		// TODO
		let component = this.getApplication().getComponentTree().getComponentById(this.getComponentId());
		let creation_command = new CreationCommand({
			applicaiton: this.getApplication(),
			component_id: this.getComponentId(),
			action: this.getAction(),
			data: component.getData(),
			type: CommandType.CREATE,
			mergeable: false,
			ack: this.getAck(),
		});

		return creation_command;
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

		// this.__action.add(command.getAction());
		return this;
	}

	mergeable() {
		return false;
	}

	// TODO
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

export { DestructionCommand };

