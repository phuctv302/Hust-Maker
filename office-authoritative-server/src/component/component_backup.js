import { ComponentTree } from './component.tree';
import { ShapeFactory, Rectangle } from '../shapes/shapes';
import { CommandType, ResizeType } from './../commands/commands';



class Component {
	/**
	 * @var {Component}
	 */
	__parent_component;

	/**
	 * @var {Component[]}
	 */
	__child_components;

	
	/**
	 * @var {ComponentTree}
	 */
	__component_tree;

	/**
	 * @var {Rectangle}
	 */
	__shape;

	constructor(props) {
		this.__id = props.id ? props.id : uuid();
		this.__child_components = [];
		this.__parent_component = null;
		this.__shape = ShapeFactory.create(props.shape);
	}

	/**
	 * 
	 * @param {ComponentTree} component_tree 
	 */
	setComponentTree(component_tree) {
		this.__component_tree = component_tree;
	}

	render() {
		this.getShape().render();
	}

	/**
	 * 
	 * @param {Point} point 
	 * @returns 
	 */
	contain(point) {
		return this.getShape().contain(point);
	}

	mousedown() {
		this.getShape().mousedown();
	}

	mouseup() {
		this.getShape().mouseup();
	}

	mousemove() {
		this.getShape().mousemove();
		this.__component_tree.updateBoundary(this);
	}

	getEventHandler() {
		return this.getShape().getEventHandler();
	}


	/**
	 * 
	 * @returns Float
	 */
	getMinX() {
		return this.getShape().getMinX();
	}

	/**
	 * 
	 * @returns Float
	 */
	getMaxX() {
		return this.getShape().getMaxX();
	}

	/**
	 * 
	 * @returns Float
	 */
	getMaxY() {
		return this.getShape().getMaxY();
	}

	/**
	 * 
	 * @returns Float
	 */
	getMinY() {
		return this.getShape().getMinY();
	}


	getAngle() {
		return this.getShape().getAngle();

	}

	getShape() {
		return this.__shape;
	}

	translate(vector) {
		this.getShape().translate(vector);
		this.__component_tree.updateBoundary(this);
	}

	getId() {
		return this.__id;
	}

	getChildComponents() {
		return this.__child_components;
	}

	getParentComponent() {
		return this.__parent_component;
	}


	findComponentById(component_id) {
		if (this.getId() == component_id) {
			return this;
		}

		for (const component of this.getChildComponents()) {
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

		this.getEventHandler().getApplication().render();
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
		let rect = new Rectangle({
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			angle: this.getAngle(),
			fill: '#efeefe',
			stroke: "#ffe00f",
			opacity: 1,
			scalable: true,
			event_handler: this.getEventHandler(),
		});

		let vec = command.getAction();
		rect.resize_top(vec);

		this.setX(rect.getX());
		this.setY(rect.getY());
		this.setWidth(rect.getWidth());
		this.setHeight(rect.getHeight());
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_bottom(command) {
		let rect = new Rectangle({
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			angle: this.getAngle(),
			fill: '#efeefe',
			stroke: "#ffe00f",
			opacity: 1,
			scalable: true,
			event_handler: this.getEventHandler(),
		});

		let vec = command.getAction();
		rect.resize_bottom(vec);

		this.setX(rect.getX());
		this.setY(rect.getY());
		this.setWidth(rect.getWidth());
		this.setHeight(rect.getHeight());
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_left(command) {
		let rect = new Rectangle({
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			angle: this.getAngle(),
			fill: '#efeefe',
			stroke: "#ffe00f",
			opacity: 1,
			scalable: true,
			event_handler: this.getEventHandler(),
		});

		let vec = command.getAction();
		rect.resize_left(vec);

		this.setX(rect.getX());
		this.setY(rect.getY());
		this.setWidth(rect.getWidth());
		this.setHeight(rect.getHeight());
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_right(command) {
		let rect = new Rectangle({
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			angle: this.getAngle(),
			fill: '#efeefe',
			stroke: "#ffe00f",
			opacity: 1,
			scalable: true,
			event_handler: this.getEventHandler(),
		});

		let vec = command.getAction();
		rect.resize_right(vec);

		this.setX(rect.getX());
		this.setY(rect.getY());
		this.setWidth(rect.getWidth());
		this.setHeight(rect.getHeight());
	}


	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_top_left(command) {
		let rect = new Rectangle({
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			angle: this.getAngle(),
			fill: '#efeefe',
			stroke: "#ffe00f",
			opacity: 1,
			scalable: true,
			event_handler: this.getEventHandler(),
		});

		let vec = command.getAction();
		rect.resize_top_left(vec);

		this.setX(rect.getX());
		this.setY(rect.getY());
		this.setWidth(rect.getWidth());
		this.setHeight(rect.getHeight());
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_top_right(command) {
		let rect = new Rectangle({
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			angle: this.getAngle(),
			fill: '#efeefe',
			stroke: "#ffe00f",
			opacity: 1,
			scalable: true,
			event_handler: this.getEventHandler(),
		});

		let vec = command.getAction();
		rect.resize_top_right(vec);

		this.setX(rect.getX());
		this.setY(rect.getY());
		this.setWidth(rect.getWidth());
		this.setHeight(rect.getHeight());
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_bottom_left(command) {
		let rect = new Rectangle({
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			angle: this.getAngle(),
			fill: '#efeefe',
			stroke: "#ffe00f",
			opacity: 1,
			scalable: true,
			event_handler: this.getEventHandler(),
		});

		let vec = command.getAction();
		rect.resize_bottom_left(vec);

		this.setX(rect.getX());
		this.setY(rect.getY());
		this.setWidth(rect.getWidth());
		this.setHeight(rect.getHeight());
	}

	/**
	 * 
	 * @param {Command} command 
	 */
	__exec_resize_bottom_right(command) {
		let rect = new Rectangle({
			x: this.getX(),
			y: this.getY(),
			width: this.getWidth(),
			height: this.getHeight(),
			angle: this.getAngle(),
			fill: '#efeefe',
			stroke: "#ffe00f",
			opacity: 1,
			scalable: true,
			event_handler: this.getEventHandler(),
		});

		let vec = command.getAction();
		rect.resize_bottom_right(vec);

		this.setX(rect.getX());
		this.setY(rect.getY());
		this.setWidth(rect.getWidth());
		this.setHeight(rect.getHeight());
	}

	/**
	 * 
	 * @param {Float} height 
	 */
	 setHeight(height) {
		this.getShape().setHeight(height);
	}

	/**
	 * 
	 * @returns Float
	 */
	getHeight() {
		return this.getShape().getHeight();
	}

	/**
	 * 
	 * @param {Float} width 
	 */
	setWidth(width) {
		this.getShape().setWidth(width);
	}

	/**
	 * 
	 * @returns Float
	 */
	getWidth() {
		return this.getShape().getWidth();
	}

	/**
	 * 
	 * @param {Float} x 
	 */
	setX(x) {
		this.getShape().setX(x);
	}

	/**
	 * 
	 * @returns Float
	 */
	getX() {
		return this.getShape().getX();
	}

	/**
	 * 
	 * @param {Float} y 
	 */
	setY(y) {
		this.getShape().setY(y);
	}

	/**
	 * 
	 * @returns Float
	 */
	getY() {
		return this.getShape().getY();
	}

	/**
	 * 
	 * @returns Float
	 */
	getAngle() {
		return this.getShape().getAngle();
	}
}

export { Component };
