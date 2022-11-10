import { Point } from './point.js';
import { Vector } from './vector.js';

const ShapeType = {
	SHAPE: "shape",
	RECTANGLE: 'rectangle',
	IMAGE: 'image',
}


const Display = {
	NONE: 'NONE',
	BLOCK: 'BLOCK',
}

class Shape {
	/**
	 * @var {EventHandler}
	 */
	__event_handler;

	/**
	 * @var {Float} __opacity
	 */
	__opacity;
	

	/**
	 * @var {String} __stroke
	 */
	__stroke;

	/**
	 * @var {String} __fill
	 */
	__fill;

	/**
	 * @var {boolean}
	 */
	__scalable;

	/**
	 * @var {Display}
	 */
	__display;
	
	/**
	 * @var {ShapeType}
	 */
	__type;


	constructor(props) {
		this.__event_handler = props.event_handler;

		this.__stroke = props.stroke;
		this.__fill = props.fill;
		this.__opacity = props.opacity;
		this.__scalable = props.scalable;

		this.__display = Display.BLOCK;
		this.__type = ShapeType.SHAPE;
	}

	render() {
		if (this.__display == Display.NONE) {
			return;
		}
	}

	mousedown() {
		console.log('mousedown on shape');
	}

	mousemove() {
		console.log('mousemove on shape');
	}

	mouseup() {
		console.log('mouseup on shape');
	}

	/**
	 * 
	 * @param {Vector} vector 
	 */
	translate(vector) {
		console.log("translate on shape")
	}

	/**
	 * 
	 * @param {Point} point 
	 * @returns boolean
	 */
	contain(point) {
		console.log("check if containing point in shape", point);
		return false;
	}

	/**
	 * 
	 * @param {Display} display 
	 */
	setDisplay(display) {
		this.__display = display;
	}

	getDisplay() {
		return this.__display;
	}


	setEventHandler(event_handler) {
		this.__event_handler = event_handler;
	}

	/**
	 * 
	 * @returns EventHandler
	 */
	getEventHandler() {
		return this.__event_handler;
	}

	/**
	 * 
	 * @returns Float
	 */
	getScale() {
		let scale = 1;
		if (this.__scalable) {
			scale = this.getEventHandler().getApplication().getCanvas().getScale();
		}
		return scale;
	}

	/**
	 * 
	 * @returns ShapeType
	 */
	getType() {
		return this.__type;
	}

	/**
	 * 
	 * @param {Point} point 
	 * @return Point
	 */
	convertPointToLocalCoordinate(point) {
		return point.clone();
	}

	/**
	 * 
	 * @param {Point} point 
	 * @returns Point
	 */
	convertPointToGlobalCoordinate(point) {
		return point.clone();
	}

	/**
	 * 
	 * @param {Vector} vector 
	 * @returns Vector
	 */
	convertVectorToLocalCoordinate(vector) {
		return vector.clone();
	}

	/**
	 * 
	 * @param {Vector} vector 
	 * @returns Vector
	 */
	convertVectorToGlobalCoordinate(vector) {
		return vector.clone();
	}
}


export { Shape, Display, ShapeType };

