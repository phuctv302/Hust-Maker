import { Point } from './point.js';



class Vector {
	/**
	 * @var {Float}
	 */
	x;

	/**
	 * @var {Float}
	 */
	y;


	constructor(props) {
		this.x = props.x;
		this.y = props.y;
	}

	/**
	 * @desc WARNING: this function may wrong or not work correctly.
	 * @param {float} radians
	 * @returns Vector
	 */
	rotate(radians){
		let x = this.x;
		let y = this.y;
		this.x = x * Math.cos(radians) - y * Math.sin(radians);
		this.y = x * Math.sin(radians) + y * Math.cos(radians);

		return this;
	}

	/**
	 * 
	 * @param {Vector} vector 
	 * @returns float
	 */
	dotProduct(vector){
		return this.x * vector.x + this.y * vector.y;
	}

	/**
	 * 
	 * @returns float
	 */
	len(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/**
	 * @desc caculate angle in radians between two vectors
	 * @param {Vector} vector
	 * @returns float
	 */
	angle(vector){
		return Math.acos(this.dotProduct(vector) / (this.len() * vector.len()));
	}

	/**
	 * 
	 * @param {Vector} vector 
	 * @returns Vector
	 */
	add(vector){
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	/**
	 * 
	 * @param {Vector} vector 
	 * @returns Vector
	 */
	sub(vector){
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}

	/**
	 * 
	 * @returns Vector
	 */
	clone(){
		return new Vector({
			x: this.x,
			y: this.y,
		});
	}

	/**
	 * 
	 * @returns Vector
	 */
	rev(){
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	/**
	 * 
	 * @param {Float} scale 
	 * @returns Vector
	 */
	scale(scale){
		this.x *= scale;
		this.y *= scale;
		return this;
	}

	/**
	 * 
	 * @returns Point
	 */
	dynIntoPoint() {
		return new Point({
			x: this.x,
			y: this.y,
		});
	}

	getProps() {
		return {
			x: this.x,
			y: this.y,
		}
	}

	/**
	 * 
	 * @param {Vector} vector_a 
	 * @param {Vector} vector_b 
	 * @returns Vector
	 */
	static sum(vector_a, vector_b){
		return new Vector({
			x: vector_a.x + vector_b.x,
			y: vector_a.y + vector_b.y
		});
	}

	/**
	 * 
	 * @param {Point} point_a 
	 * @param {Point} point_b 
	 * @returns Vector
	 */
	static from(point_a, point_b){
		return new Vector({
			x: point_b.x - point_a.x,
			y: point_b.y - point_a.y
		});
	}
}


export { Vector };

