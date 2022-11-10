import { Command, CommandType } from './command.js';
import { Vector } from './../shapes/shapes.js';

const ResizeType = {
	RESIZE_TOP: 'resize-top',
	RESIZE_BOTTOM: 'resize-bottom',
	RESIZE_LEFT: 'resize-left',
	RESIZE_RIGHT: 'resize-right',
	RESIZE_TOP_LEFT: 'resize-top-left',
	RESIZE_TOP_RIGHT: 'resize-top-right',
	RESIZE_BOTTOM_LEFT: 'resize-bottom-left',
	RESIZE_BOTTOM_RIGHT: 'resize-bottom-right',
}

class ResizeCommand extends Command {
	__resize_type;


	constructor(props) {
		super(props);

		this.__mergeable = true;
		this.__type = CommandType.RESIZE;
		this.__resize_type = props.resize_type;

		if (typeof props.action != 'function') {
			this.__action = new Vector(props.action);
		}
	}

	/**
	 * 
	 * @returns Command
	 */
	clone() {
		let clone = new ResizeCommand({
			application: this.getApplication(),
			component_id: this.getComponentId(),
			action: this.getAction(),
			data: this.getData(),
			type: this.getType(),
			mergeable: this.mergeable(),
			resize_type: this.getResizeType(),
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

	getResizeType() {
		return this.__resize_type;
	}

	getProps() {
		return {
			component_id: this.getComponentId(),
			action: this.getAction().getProps(),
			data: this.getData(),
			type: this.getType(),
			resize_type: this.getResizeType(),
			mergeable: this.mergeable(),
			ack: this.getAck(),
		}
	}
}


export { ResizeCommand, ResizeType };

