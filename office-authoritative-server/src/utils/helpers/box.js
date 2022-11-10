
import { CommandType, ResizeType } from '../../commands/commands.js';
import { ShapeFactory, Vector, Point, Display, Rectangle, ShapeType } from '../../shapes/shapes.js'

import rotate_right_img from './../../imgs/rotate-right.svg';


class Box extends Rectangle {

	/**
	 * @var {Integer}
	 */
	__square_size;

	/**
	 * @var {CommandType}
	 */
	__command_type;

	/**
	 * @var {ResizeType}
	 */
	__resize_type;

	__rotatable;
	__rotate_right_img;

	constructor(props) {
		super(props);

		this.__square_size = 8;
		this.__command_type = CommandType.NONE;

		const shape = {
			x: 0,
			y: 0,
			width: this.__square_size * 2,
			height: this.__square_size * 2,
			angle: 0,
			fill: '#ffffff',
			stroke: "#ffffff",
			opacity: 1,
			scalable: false,
			src: rotate_right_img,
			type: ShapeType.IMAGE,
			event_handler: this.getEventHandler(),
		};
		this.__rotate_right_img = ShapeFactory.create(shape);
		this.__rotatable = false;
	}

	__clone(props) {
		return {...props};
	}

	__updateRotateImg() {
		const SCALE = this.getScale();
		this.__rotate_right_img.setX(SCALE * (this.__x + this.__width / 2) - this.__square_size);
		this.__rotate_right_img.setY(SCALE * this.__y - 20 - this.__square_size);
	}

	render() {
		if (this.__display == Display.NONE) {
			return;
		}

		super.render();

		const SCALE = this.getScale();
		
		let context = this.getEventHandler().getApplication().getCanvas().getContext2d();
		context.save();

		context.globalAlpha = this.__opacity;
		context.fillStyle = this.__fill;
		context.strokeStyle = this.__stroke;

		// let vector = new Vector({x: SCALE * this.__center.x, y: SCALE * this.__center.y});
		context.translate(this.__x + this.__width/2, this.__y + this.__height/2);
		context.rotate(this.__angle);

		// vector = Vector.from(vector.dynIntoPoint, new Point({x: this.__x + this.__width/2, y: this.__y + this.__height/2})).scale(SCALE);
		// context.translate(vector.x, vector.y);

		context.fillRect(SCALE * this.__width / -2, SCALE * this.__height / -2, SCALE * this.__width, SCALE * this.__height);
		context.strokeRect(SCALE * this.__width / -2, SCALE * this.__height / -2, SCALE * this.__width, SCALE * this.__height);

		context.fillStyle = "#ffffff";

		context.translate(SCALE * this.__width / -2, SCALE * this.__height / -2, SCALE * this.__width, SCALE * this.__height);
		context.fillRect(this.__square_size / -2, this.__square_size / -2, this.__square_size, this.__square_size);
		context.strokeRect(this.__square_size / -2, this.__square_size / -2, this.__square_size, this.__square_size);

		context.translate(SCALE * this.__width, 0);
		context.fillRect(this.__square_size / -2, this.__square_size / -2, this.__square_size, this.__square_size);
		context.strokeRect(this.__square_size / -2, this.__square_size / -2, this.__square_size, this.__square_size);

		context.translate(0, SCALE * this.__height);
		context.fillRect(this.__square_size / -2, this.__square_size / -2, this.__square_size, this.__square_size);
		context.strokeRect(this.__square_size / -2, this.__square_size / -2, this.__square_size, this.__square_size);

		context.translate(-SCALE * this.__width, 0);
		context.fillRect(this.__square_size / -2, this.__square_size / -2, this.__square_size, this.__square_size);
		context.strokeRect(this.__square_size / -2, this.__square_size / -2, this.__square_size, this.__square_size);

		context.restore();

		if (this.rotatable()) {
			this.__updateRotateImg();
			this.__rotate_right_img.render();
		}
	}

	mouseup() {
		this.__command_type = CommandType.NONE;
	}

	mousedown() {
		const SCALE = this.getScale();


		let point =  this.getEventHandler().getOriginCursor();
		let p = point
			.clone()
			.translate(new Vector({x: -SCALE * (this.__x + this.__width/2), y: -SCALE * (this.__y + this.__height/2),}))
			.dynIntoVector()
			.rotate(-this.__angle)
			.dynIntoPoint();
		
		if (
			p.x > -SCALE * this.__width/2 + this.__square_size/2 && 
			p.x < +SCALE * this.__width/2 - this.__square_size/2 && 
			p.y > -SCALE * this.__height/2 + this.__square_size/2 && 
			p.y < +SCALE * this.__height/2 - this.__square_size/2
		) {
			this.__command_type = CommandType.MOVE;
			console.log('moving');
			return;
		}

		if (
			p.x > -SCALE * this.__width/2 + this.__square_size/2 && 
			p.x < +SCALE * this.__width/2 - this.__square_size/2 && 
			p.y > -SCALE * this.__height/2 - this.__square_size/2 && 
			p.y < -SCALE * this.__height/2 + this.__square_size/2
		) {
			this.__command_type = CommandType.RESIZE;
			this.__resize_type = ResizeType.RESIZE_TOP;
			console.log('resize top');
			return;
		}

		if (
			p.x > -SCALE * this.__width/2 + this.__square_size/2 && 
			p.x < +SCALE * this.__width/2 - this.__square_size/2 && 
			p.y > +SCALE * this.__height/2 - this.__square_size/2 && 
			p.y < +SCALE * this.__height/2 + this.__square_size/2
		) {
			this.__command_type = CommandType.RESIZE;
			this.__resize_type = ResizeType.RESIZE_BOTTOM;
			console.log('resize bottom');
			return;
		}

		if (
			p.x > -SCALE * this.__width/2 - this.__square_size/2 && 
			p.x < -SCALE * this.__width/2 + this.__square_size/2 && 
			p.y > -SCALE * this.__height/2 + this.__square_size/2 && 
			p.y < +SCALE * this.__height/2 - this.__square_size/2
		) {
			this.__command_type = CommandType.RESIZE;
			this.__resize_type = ResizeType.RESIZE_LEFT;
			console.log('resize left');
			return;
		}

		if (
			p.x > +SCALE * this.__width/2 - this.__square_size/2 && 
			p.x < +SCALE * this.__width/2 + this.__square_size/2 && 
			p.y > -SCALE * this.__height/2 + this.__square_size/2 && 
			p.y < +SCALE * this.__height/2 - this.__square_size/2
		) {
			this.__command_type = CommandType.RESIZE;
			this.__resize_type = ResizeType.RESIZE_RIGHT;
			console.log('resize right');
			return;
		}

		if (
			p.x > -SCALE * this.__width/2 - this.__square_size/2 && 
			p.x < -SCALE * this.__width/2 + this.__square_size/2 && 
			p.y > -SCALE * this.__height/2 - this.__square_size/2 && 
			p.y < -SCALE * this.__height/2 + this.__square_size/2
		) {
			this.__command_type = CommandType.RESIZE;
			this.__resize_type = ResizeType.RESIZE_TOP_LEFT;
			console.log('resize top left');
			return;
		}

		if (
			p.x > +SCALE * this.__width/2 - this.__square_size/2 && 
			p.x < +SCALE * this.__width/2 + this.__square_size/2 && 
			p.y > -SCALE * this.__height/2 - this.__square_size/2 && 
			p.y < -SCALE * this.__height/2 + this.__square_size/2
		) {
			this.__command_type = CommandType.RESIZE;
			this.__resize_type = ResizeType.RESIZE_TOP_RIGHT;
			console.log('resize top right');
			return;
		}

		if (
			p.x > +SCALE * this.__width/2 - this.__square_size/2 && 
			p.x < +SCALE * this.__width/2 + this.__square_size/2 && 
			p.y > +SCALE * this.__height/2 - this.__square_size/2 && 
			p.y < +SCALE * this.__height/2 + this.__square_size/2
		) {
			this.__command_type = CommandType.RESIZE;
			this.__resize_type = ResizeType.RESIZE_BOTTOM_RIGHT;
			console.log('resize bottom right');
			return;
		}

		if (
			p.x > -SCALE * this.__width/2 - this.__square_size/2 && 
			p.x < -SCALE * this.__width/2 + this.__square_size/2 && 
			p.y > +SCALE * this.__height/2 - this.__square_size/2 && 
			p.y < +SCALE * this.__height/2 + this.__square_size/2
		) {
			this.__command_type = CommandType.RESIZE;
			this.__resize_type = ResizeType.RESIZE_BOTTOM_LEFT;
			console.log('resize bottom left');
			return;
		}

		if (
			p.x > - this.__square_size &&
			p.x < + this.__square_size &&
			p.y > -SCALE * this.__height/2 - 20 - this.__square_size &&
			p.y < -SCALE * this.__height/2 - 20 + this.__square_size &&
			this.getDisplay() == Display.BLOCK
 		) {
			this.__command_type = CommandType.ROTATION;
			console.log('rotate');
			return;
		}


		this.__command_type = CommandType.NONE;
	}

	mousemove() {
		// console.log('helper mousemove')
		// let event_handler = this.getEventHandler();
		// let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor());
		// // this.translate(vector);

		// if (this.__command_type == CommandType.MOVE) {
		// 	this.translate(vector);
		// }
	}

	/**
	 * 
	 * @param {Point} point 
	 * @returns 
	 */
	contain(point) {

		const SCALE = this.getScale();

		let p = point
			.clone()
			.translate(new Vector({x: -SCALE * (this.__x + this.__width/2), y: -SCALE * (this.__y + this.__height/2),}))
			.dynIntoVector()
			.rotate(-this.__angle)
			.dynIntoPoint();
		
		if (
			p.x > -SCALE * this.__width/2 - this.__square_size/2 && 
			p.x < SCALE * this.__width/2 + this.__square_size/2 && 
			p.y > -SCALE * this.__height/2 - this.__square_size/2 && 
			p.y < SCALE * this.__height/2 + this.__square_size/2
			) {
			return true;
		}

		if (
			p.x > - this.__square_size &&
			p.x < + this.__square_size &&
			p.y > -SCALE * this.__height/2 - 20 - this.__square_size &&
			p.y < -SCALE * this.__height/2 - 20 + this.__square_size &&
			this.getDisplay() == Display.BLOCK
 		) {
			return true;
		}

		return false;
	}

	getCommandType() {
		return this.__command_type;
	}

	/**
	 * 
	 * @param {CommandType} command_type 
	 */
	setCommandType(command_type) {
		this.__command_type = command_type;
	}

	/**
	 * 
	 * @returns ResizeType
	 */
	getResizeType() {
		return this.__resize_type;
	}

	setRotatable(rotatable) {
		this.__rotatable = rotatable;
	}

	rotatable() {
		return this.__rotatable;
	}
}

export { Box };