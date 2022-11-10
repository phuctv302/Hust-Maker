import { Helper } from './helper.js';
import { Point, Rectangle, Vector, Display } from './../../shapes/shapes.js';
import { CommandType, ResizeType, MoveCommand, ResizeCommand, RotationCommand } from '../../commands/commands.js';
import { Box } from './box.js';


class SelectorHelper extends Helper {

	/**
	 * @var {Component}
	 */
	__component;

	/**
	 * @var {Box}
	 */
	__box;

	__selected;

	__preview_landing = null;


	/**
	 * 
	 * @param {Application} application 
	 */
	constructor(application) {
		super(application);

		this.__selected = false;

		this.__box = new Box({
			x: 0,
			y: 0,
			width: 1,
			height: 1,
			angle: 0,
			opacity: 1,
			fill: "rgba(225, 225, 225, 0)",
			stroke: "#0a95ff",
			scalable: false,
			event_handler: this.getApplication().getEventHandler(),
		});

		this.__box.setDisplay(Display.NONE);
	}

	/**
	 * 
	 * @param {Component} component 
	 */
	setComponent(component) {
		this.__box.setDisplay(Display.BLOCK);

		if (!component) {
			this.__box.setDisplay(Display.NONE);
			return;
		}

		this.__component = component;

		this.update();
		this.__box.setCommandType(CommandType.MOVE);
	}

	__isRenderPreviewLanding() {
		return this.__box.getCommandType() == CommandType.MOVE && this.__preview_landing;
	}

	render() {
		if (!this.__box) {
			return;
		}
		// if (this.__isRenderPreviewLanding()) {
		// 	this.__preview_landing.render();
		// }

		this.__box.render();
	}

	update() {
		if (this.__box.getDisplay() == Display.NONE) {
			return;
		}
		const x = this.__component.getMinX();
		const y = this.__component.getMinY();
		const width = this.__component.getMaxX() - x;
		const height = this.__component.getMaxY() - y;
		this.__box.setX(x);
		this.__box.setY(y);
		this.__box.setWidth(width);
		this.__box.setHeight(height);
		this.__box.setRotatable(this.__component.rotatable());
	}

	contain(point) {
		if (this.__box.getDisplay() == Display.NONE) {
			return false;
		}

		return this.__box.contain(point);
	}

	mousedown() {
		this.__selected = true;
		this.__box.mousedown();
		this.__box.setDisplay(Display.BLOCK);
	}

	mouseup() {
		if (!this.__box || !this.__selected) {
			return false;
		}

		let current_position = new Point({x: this.getComponent().getX(), y: this.getComponent().getY()});
		let position_current_cell = this.getApplication().getComponentTree().getCellPositionOnGridByAbsolutePoint(current_position.clone());
		
		let vector = Vector.from(current_position, position_current_cell);

		// if (vector.x != 0 || vector.y !=0) {
		// 	let command = new MoveCommand({
		// 		application: this.getApplication(),
		// 		component_id: this.getComponent().getId(),
		// 		action: vector,
		// 		data: null,
		// 		type: CommandType.MOVE,
		// 		mergeable: true,
		// 	});
	
		// 	command.execute();
		// 	this.update();
		// }

		if (this.__box.getCommandType() == CommandType.ROTATION) {
			if (this.getComponent().rotatable()) {
				let command = new RotationCommand({
					application: this.getApplication(),
					component_id: this.getComponent().getId(),
					action: null,
					data: { angle: 90 },
					type: CommandType.ROTATION,
					mergeable: true,
				});
				command.execute();
				this.update();
			}
		}
		

		this.__selected = false;
		this.__box.mouseup();
	}

	mousemove() {
		if (!this.__box) {
			return false;
		}

		const command_type = this.__box.getCommandType();
		let command = null;
		let event_handler = this.getApplication().getEventHandler();
		const SCALE = this.getApplication().getCanvas().getScale();

		if (command_type == CommandType.MOVE) {
			let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/SCALE);

			command = new MoveCommand({
				application: this.getApplication(),
				component_id: this.getComponent().getId(),
				action: vector,
				data: null,
				type: CommandType.MOVE,
				mergeable: true,
			});

			let current_position = new Point({x: this.getComponent().getX(), y: this.getComponent().getY()});
			let position_current_cell = this.getApplication().getComponentTree().getCellPositionOnGridByAbsolutePoint(current_position);
			
			//let position_current_cell = this.getApplication().getComponentTree().getCellPositionOnGridByPoint(event_handler.getOriginCursor());
			this.__preview_landing = new Rectangle({
				x: position_current_cell.x,
				y: position_current_cell.y,
				width: this.__component.getWidth(),
				height: this.__component.getHeight(),
				angle: 0,
				event_handler: event_handler,
				stroke: "#ffffff",
				fill: "#00cc00",
				opacity: 0.2,
				scalable: true,
			});
		}

		if (command_type == CommandType.RESIZE) {

			const resize_type = this.__box.getResizeType();

			if (resize_type == ResizeType.RESIZE_TOP) {
				let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/SCALE);
	
				command = new ResizeCommand({
					application: this.getApplication(),
					component_id: this.getComponent().getId(),
					action: vector,
					data: null,
					type: CommandType.RESIZE,
					resize_type: ResizeType.RESIZE_TOP,
					mergeable: true,
				});
			}	
	
			if (resize_type == ResizeType.RESIZE_BOTTOM) {
				let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/SCALE);
	
				command = new ResizeCommand({
					application: this.getApplication(),
					component_id: this.getComponent().getId(),
					action: vector,
					data: null,
					type: CommandType.RESIZE,
					resize_type: ResizeType.RESIZE_BOTTOM,
					mergeable: true,
				});		
			}
	
			if (resize_type == ResizeType.RESIZE_LEFT) {
				let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/SCALE);
	
				command = new ResizeCommand({
					application: this.getApplication(),
					component_id: this.getComponent().getId(),
					action: vector,
					data: null,
					type: CommandType.RESIZE,
					resize_type: ResizeType.RESIZE_LEFT,
					mergeable: true,
				});		
			}
	
			if (resize_type == ResizeType.RESIZE_RIGHT) {
				let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/SCALE);
	
				command = new ResizeCommand({
					application: this.getApplication(),
					component_id: this.getComponent().getId(),
					action: vector,
					data: null,
					type: CommandType.RESIZE,
					resize_type: ResizeType.RESIZE_RIGHT,
					mergeable: true,
				});		
			}
	
			if (resize_type == ResizeType.RESIZE_TOP_LEFT) {
				let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/SCALE);
				
				command = new ResizeCommand({
					application: this.getApplication(),
					component_id: this.getComponent().getId(),
					action: vector,
					data: null,
					type: CommandType.RESIZE,
					resize_type: ResizeType.RESIZE_TOP_LEFT,
					mergeable: true,
				});	
			}
	
			if (resize_type == ResizeType.RESIZE_TOP_RIGHT) {
				let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/SCALE);
				
				command = new ResizeCommand({
					application: this.getApplication(),
					component_id: this.getComponent().getId(),
					action: vector,
					data: null,
					type: CommandType.RESIZE,
					resize_type: ResizeType.RESIZE_TOP_RIGHT,
					mergeable: true,
				});	
			}
	
			if (resize_type == ResizeType.RESIZE_BOTTOM_LEFT) {
				let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/SCALE);
				
				command = new ResizeCommand({
					application: this.getApplication(),
					component_id: this.getComponent().getId(),
					action: vector,
					data: null,
					type: CommandType.RESIZE,
					resize_type: ResizeType.RESIZE_BOTTOM_LEFT,
					mergeable: true,
				});	
			}
	
			if (resize_type == ResizeType.RESIZE_BOTTOM_RIGHT) {
				let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/SCALE);
				
				command = new ResizeCommand({
					application: this.getApplication(),
					component_id: this.getComponent().getId(),
					action: vector,
					data: null,
					type: CommandType.RESIZE,
					resize_type: ResizeType.RESIZE_BOTTOM_RIGHT,
					mergeable: true,
				});	
			}
		}

		

		if (command) {
			command.execute();
		}
	}

	getComponent() {
		return this.__component;
	}
}


export { SelectorHelper };


