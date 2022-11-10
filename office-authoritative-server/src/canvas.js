import { Point } from './shapes/point.js';
import { Vector } from './shapes/vector.js';


class Canvas {
	/**
	 * @var {String}
	 */
	__id;

	/**
	 * @var {Float}
	 */
	__width;

	/**
	 * @var {Float}
	 */
	__height;

	/**
	 * @var {Float}
	 */
	__scale;


	/**
	 * @var {CanvasRenderingContext2D}
	 */
	__context;

	/**
	 * @var {Point}
	 */
	__origin;

	/**
	 * 
	 * @param {Object} props 
	 */
	constructor(props) {
		this.__id = props.id;
		this.__width = props.width;
		this.__height = props.height;

		let canvas = this.getDOMElement();

		canvas.width = this.__width;
		canvas.height = this.__height;

		canvas.style.width  = this.__width + 'px';
		canvas.style.height = this.__height + 'px';

		this.__scale = 1;
		this.__origin = new Point({x: 0, y: 0});
	}

	/**
	 * 
	 * @param {Vector} vector 
	 */
	translate(vector) {
		let context = this.__context;
		this.__origin.translate(vector);
		context.translate(vector.x, vector.y);
	}

	getDOMElement() {
		return document.getElementById(this.__id);
	}

	getJQueryObject() {
		return $('#'+this.__id);
	}

	/**
	 * 
	 * @returns CanvasRenderingContext2D
	 */
	getContext2d() {
		if (!this.__context) {
			let canvas = this.getDOMElement();
			this.__context = canvas.getContext("2d");
		}
		
		return this.__context;
	}

	/**
	 * 
	 */
	clear() {
		var context = this.getContext2d();
		// const PADDING = 1000;
		// context.clearRect(this.__origin.x - PADDING, this.__origin.y - PADDING, this.__width + PADDING, this.__height + PADDING);

		// context.clearRect(this.__origin.x, this.__origin.y, this.__width, this.__height);
		context.clearRect(-this.__origin.x, -this.__origin.y, this.__width, this.__height);
	}

	/**
	 * 
	 * @param {Float} scale 
	 */
	setScale(scale) {
		this.__scale = scale;
	}

	/**
	 * 
	 * @returns Float
	 */
	getScale() {
		return this.__scale;
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
	 * @returns Float
	 */
	getHeight() {
		return this.__height;
	}

	/**
	 * 
	 * @returns Point
	 */
	getOrigin() {
		return this.__origin;
	}

	setMouseStyle(style) {
		this.getDOMElement().style.cursor = style;
	}

	clearMouseStyle() {
		this.getDOMElement().style.cursor = "default";
	}
}

export { Canvas };
