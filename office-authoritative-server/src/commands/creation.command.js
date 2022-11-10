import { Command, CommandType } from './command.js';
import { ComponentFactory } from './../component/components.js';
// import { FinalComponent } from './../component/final.component';



class CreationCommand extends Command {
	constructor(props) {
		super(props);

		this.__type = CommandType.CREATION;
		this.__mergeable = false;
		
	}

	/**
	 * 
	 * @returns Command
	 */
	clone() {
		let clone = new CreationCommand({
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

	execute() {
		console.log("executing command")
		if (this.getComponentId()) {
			this.__data.id = this.getComponentId();
		}

		let component = ComponentFactory.create(this.__data);

		this.getApplication().append(component);
		this.__save();
	}

	/**
	 * 
	 * @returns Self
	 */
	rev() {
		// TODO
		let destruction_command = new DestructionCommand({
			application: this.getApplication(),
			component_id: this.getComponentId(),
			action: this.getAction(),
			data: null,
			type: CommandType.DELETE,
			mergeable: false,
			ack: this.getAck(),
		});

		return destruction_command;
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

	getProps() {
		// {...var} meaning copy that dict but not recursive
		// let shape = {...this.getData().shape};
		// shape.event_handler = null;

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

export { CreationCommand };
