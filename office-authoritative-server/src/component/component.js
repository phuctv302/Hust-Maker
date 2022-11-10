import { ComponentTree } from './component.tree.js';
import { ShapeFactory, ShapeType } from '../shapes/shapes.js';
import { CommandType, ResizeType } from './../commands/commands.js';
import { Point } from './../shapes/shapes.js';


const ComponentType = {
	DEFAULT: 'default',
	ROTATABLE: 'rotate-able',
}


class Component {
	/**
	 * @var {String}
	 */
	__id;

	/**
	 * @var {Float}
	 */
	__x;

	/**
	 * @var {Float}
	 */
	__y;

	/**
	 * @var {Float}
	 */
	__width;

	/**
	 * @var {Float}
	 */
	__height;

	/**
	 * @var {Component}
	 */
	__parent;

	/**
	 * @var {Component[]}
	 */
	__children;

	
	/**
	 * @var {ComponentTree}
	 */
	__component_tree;

	/**
	 * @var {Rectangle}
	 */
	__shape;

	__img;

	__type;

	constructor(props) {
		this.__id = props.id ? props.id : uuid();
		this.__x = props.x;
		this.__y = props.y;
		this.__width = props.width;
		this.__height = props.height;
		
		this.__children = [];
		this.__parent = null;

		this.__img = props.img;

		this.__type = ComponentType.DEFAULT;
	}

	/**
	 * 
	 * @param {ComponentTree} component_tree 
	 */
	setComponentTree(component_tree) {
		this.__component_tree = component_tree;
	}

	mousedown() {

	}

	mouseup() {

	}

	mousemove() {

	}

	render() {
		const SCALE = this.getComponentTree().getApplication().getCanvas().getScale();
		
		let context = this.getComponentTree().getApplication().getCanvas().getContext2d();
		context.save();

		context.globalAlpha = 1;
		context.fillStyle = '#eeeeee';
		context.strokeStyle = '#eeeeee';

		context.translate(SCALE * (this.__x + this.__width / 2), SCALE * (this.__y + this.__height / 2));
		context.rotate(this.__angle);

		context.fillRect(SCALE * this.__width / -2, SCALE * this.__height / -2, SCALE * this.__width, SCALE * this.__height);
		context.strokeRect(SCALE * this.__width / -2, SCALE * this.__height / -2, SCALE * this.__width, SCALE * this.__height);
		context.restore();

		this.__renderShape();
	}

	__renderShape() {
		const SCALE = this.getComponentTree().getApplication().getCanvas().getScale();
		let context = this.getComponentTree().getApplication().getCanvas().getContext2d();

		context.save();
		context.translate(SCALE * this.__x, SCALE * this.__y);

		let that = this;
		if (!this.getShape()) {
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
		this.getShape().render();
		
		context.restore();
	}

	/**
	 * 
	 * @param {Point} point 
	 * @returns 
	 */
	contain(point) {
		if (
			point.x >= this.getMinX() && point.x <= this.getMaxX() &&
			point.y >= this.getMinY() && point.y <= this.getMaxY()
		) {
			return true;
		}
		return false;
	}


	translate(vector) {
		let point = new Point({x: this.getX(), y: this.getY()});
		point.translate(vector);
		this.setX(point.x);
		this.setY(point.y);

		this.__component_tree.updateBoundary(this);
	}

	getId() {
		return this.__id;
	}

	getChildren() {
		return this.__children;
	}

	getParent() {
		return this.__parent;
	}

	getShape() {
		return this.__shape;
	}


	findComponentById(component_id) {
		if (this.getId() == component_id) {
			return this;
		}

		for (const component of this.getChildren()) {
			let res = component.findComponentById(component_id);

			if (res) {
				return res;
			}
		}

		return null;
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	execute(command) {
		if (command.getType() == CommandType.MOVE) {
			this.__exec_move_command(command);
		}

		if (command.getType() == CommandType.RESIZE) {
			if (command.getResizeType() == ResizeType.RESIZE_TOP) {
				this.__exec_resize_top(command);
			}
	
			if (command.getResizeType() == ResizeType.RESIZE_BOTTOM) {
				this.__exec_resize_bottom(command);
			}
	
			if (command.getResizeType() == ResizeType.RESIZE_LEFT) {
				this.__exec_resize_left(command);
			}
	
			if (command.getResizeType() == ResizeType.RESIZE_RIGHT) {
				this.__exec_resize_right(command);
			}
	
			if (command.getResizeType() == ResizeType.RESIZE_TOP_LEFT) {
				this.__exec_resize_top_left(command);
			}
	
			if (command.getResizeType() == ResizeType.RESIZE_TOP_RIGHT) {
				this.__exec_resize_top_right(command);
			}
	
			if (command.getResizeType() == ResizeType.RESIZE_BOTTOM_LEFT) {
				this.__exec_resize_bottom_left(command);
			}
	
			if (command.getResizeType() == ResizeType.RESIZE_BOTTOM_RIGHT) {
				this.__exec_resize_bottom_right(command);
			}
		}

		this.getComponentTree().getApplication().render();
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_move_command(command) {
		let vector = command.getAction().clone();
		this.translate(vector);
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_top(command) {
		return;
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_bottom(command) {
		return;
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_left(command) {
		return;
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_right(command) {
		return;
	}


	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_top_left(command) {
		return;
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_top_right(command) {
		return;
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_bottom_left(command) {
		return;
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_bottom_right(command) {
		return;
	}

	/**
	 * 
	 * @param {Float} height 
	 */
	setHeight(height) {
	this.__height = height;
	}

	/**
	 * 
	 * @returns Float
	 */
	getHeight() {
		return this.__height;
	}

	/**
	 * 
	 * @param {Float} width 
	 */
	setWidth(width) {
		this.__width = width;
	}

	/**
	 * 
	 * @returns Float
	 */
	getWidth() {
		return this.__width;
	}

	/**
	 * 
	 * @param {Float} x 
	 */
	setX(x) {
		this.__x = x;
	}

	/**
	 * 
	 * @returns Float
	 */
	getX() {
		return this.__x;
	}

	/**
	 * 
	 * @param {Float} y 
	 */
	setY(y) {
		this.__y = y;
	}

	/**
	 * 
	 * @returns Float
	 */
	getY() {
		return this.__y;
	}

	/**
	 * 
	 * @returns Float
	 */
	getAngle() {
		return 0;
	}

	getImg() {
		return this.__img;
	}


	getComponentTree() {
		return this.__component_tree;
	}


	/**
	 * 
	 * @returns Float
	 */
	getMinX() {
		const SCALE = this.getComponentTree().getApplication().getCanvas().getScale();
		return SCALE * this.getX();
	}

	/**
	 * 
	 * @returns Float
	 */
	getMaxX() {
		const SCALE = this.getComponentTree().getApplication().getCanvas().getScale();
		return SCALE * (this.getX() + this.getWidth());
	}

	/**
	 * 
	 * @returns Float
	 */
	getMaxY() {
		const SCALE = this.getComponentTree().getApplication().getCanvas().getScale();
		return SCALE * (this.getY() + this.getHeight());
	}

	/**
	 * 
	 * @returns Float
	 */
	getMinY() {
		const SCALE = this.getComponentTree().getApplication().getCanvas().getScale();
		return SCALE * this.getY();;
	}

	getProps() {
		return {
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			img: this.getImg(),
			type: this.getType(),
		}
	}

	getType() {
		return this.__type;
	}

	rotatable() {
		return false;
	}

}

export { Component, ComponentType };
