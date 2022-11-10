import { Vector } from './vector.js';


class Point {
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
	 * 
	 * @param {Vector} vector 
	 * @returns Point
	 */
	translate(vector){
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	set(props){
		this.x = props.x;
		this.y = props.y;
	}

	/**
	 * 
	 * @returns Point
	 */
	clone(){
		return new Point({
			x: this.x,
			y: this.y
		});
	}

	/**
	 * 
	 * @returns Point
	 */
	opposite() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	/**
	 * 
	 * @returns Vector
	 */
	dynIntoVector() {
		return new Vector({
			x: this.x,
			y: this.y,
		})
	}

	getProps() {
		return {
			x: this.x,
			y: this.y,
		}
	}

	/**
	 * 
	 * @param {Point} point_a 
	 * @param {Point} point_b 
	 * @returns Point
	 */
	static midpoint(point_a, point_b){
		return new Point({
			x: (point_a.x + point_b.x)/2,
			y: (point_a.y + point_b.y)/2
		});
	}
}

export { Point };


