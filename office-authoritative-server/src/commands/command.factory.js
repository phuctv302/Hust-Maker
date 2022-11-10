import { CommandType } from './command.js';
import { CreationCommand } from './creation.command.js';
import { DestructionCommand } from './destruction.command.js';
import { MoveCommand } from './move.command.js';
import { ResizeCommand } from './resize.command.js';
import { RotationCommand } from './rotation.command.js';



class CommandFactory {
	/**
	 * 
	 * @returns Command
	 */
	static create(application, props) {
		props.application = application;
		
		if (props.type == CommandType.CREATION) {
			// props.data.shape.event_handler = application.getEventHandler();
			return new CreationCommand(props);
		}

		if (props.type == CommandType.DESTRUCTION) {
			return new DestructionCommand(props);
		}

		if (props.type == CommandType.MOVE) {
			return new MoveCommand(props);
		}

		if (props.type == CommandType.RESIZE) {
			return new ResizeCommand(props);
		}

		if (props.type == CommandType.ROTATION) {
			return new RotationCommand(props);
		}
		
		return null;
	}

	static getPropsCreationCommandFromComponent(component) {
		return {
			component_id: component.getId(),
			action: null,
			data: component.getProps(),
			type: CommandType.CREATION,
			mergeable: false,
			ack: true,
		};
	}
}

export { CommandFactory };

