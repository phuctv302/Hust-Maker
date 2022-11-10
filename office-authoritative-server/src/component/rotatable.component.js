import { Component, ComponentType } from "./component.js";
import { CommandType } from './../commands/commands.js';
import { ShapeFactory, ShapeType } from '../shapes/shapes.js';


class RotatableComponent extends Component {

	__imgs;
	__angle_in_degree;

	constructor(props) {
		super(props)

		this.__imgs = props.imgs;

		this.__angle_in_degree = props.angle ? props.angle : 0;
		this.__standardizeAngle();

		this.__img = props.imgs[this.__calcIndexOfImg()];

		this.__type = ComponentType.ROTATABLE;
		
	}

	execute(command) {
		if (command.getType() == CommandType.MOVE) {
			this.__exec_move_command(command);
		}

		if (command.getType() == CommandType.ROTATION) {
			this.__exec_rotation_command(command);
		}

		this.getComponentTree().getApplication().render();
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_rotation_command(command) {
		let last_index_img = this.__calcIndexOfImg();
		this.__angle_in_degree += command.getData().angle;
		this.__standardizeAngle();

		let current_index_img = this.__calcIndexOfImg();
		this.__img = this.__imgs[this.__calcIndexOfImg()];

		if ((current_index_img - last_index_img) % 2 != 0) {
			const HEIGHT = this.getHeight();
			const WIDTH = this.getWidth();
			this.setWidth(HEIGHT);
			this.setHeight(WIDTH);
		}

		let that = this;
		if (this.getComponentTree().getApplication().getEventHandler()) {
			const shape = {
				x: 0,
				y: 0,
				width: this.getWidth(),
				height: this.getHeight(),
				angle: 0,
				fill: '#ffffff',
				stroke: "#ffffff",
				opacity: 1,
				scalable: true,
				src: this.getImg(),
				type: ShapeType.IMAGE,
				event_handler: this.getComponentTree().getApplication().getEventHandler(),
				onload: () => {
					that.__renderShape();
				},
			};
			this.__shape = ShapeFactory.create(shape);
		}
	}

	__standardizeAngle() {
		while (this.__angle_in_degree < 0) {
			this.__angle_in_degree += 360;
		}
		while (this.__angle_in_degree >= 360) {
			this.__angle_in_degree -= 360;
		}
	}

	setAngle(angle) {
		this.__angle_in_degree = angle;
		this.__standardizeAngle();
	}

	/**
	 * 
	 * @returns Float
	 */
	getAngle() {
		return this.__angle_in_degree;
	}

	__calcIndexOfImg() {
		return (this.getAngle() / 90) % this.__imgs.length;
	}

	rotatable() {
		return true;
	}

	getProps() {
		return {
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			img: this.getImg(),
			type: this.getType(),
			imgs: this.__imgs,
			angle: this.__angle_in_degree,
		}
	}
}

export { RotatableComponent };

