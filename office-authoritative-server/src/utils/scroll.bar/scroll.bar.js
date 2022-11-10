
import { Vector } from './../../shapes/vector.js';
import { Point } from './../../shapes/point.js';


class ScrollBar {

	/**
	 * @var {Rectangle}
	 */
	__rect;

	/**
	 * @var {Application}
	 */
	__application;

	/**
	 * @var {Float}
	 */
	__upper_bound;

	/**
	 * @var {Float}
	 */
	__lower_bound;

	/**
	 * @var {Point}
	 */
	__begin_point;


	/**
	 * @var {Point}
	 */
	__end_point;

	/**
	 * @var {Point}
	 */
	__scale;

	// /**
	//  * @var {Float}
	//  */
	// __upper_scroll_bound;

	// /**
	//  * @var {Float}
	//  */
	// __lower_scroll_bound;

	/**
	 * 
	 * @param {Application} application 
	 */
	constructor(application) {
		this.__application = application;
	}

	mouseup() {

	}

	mousedown() {

	}

	mousemove() {

	}

	wheel() {
		
	}

	render() {
		this.__rect.render();
	}


	/**
	 * 
	 * @param {Vector} vector 
	 */
	translate(vector) {
		// this.__begin_point.translate(vector);
		// this.__end_point.translate(vector);
		this.__rect.translate(vector);
	}

	/**
	 * 
	 * @param {Vector} vector 
	 */
	translateAll(vector) {
		this.__begin_point.translate(vector);
		this.__end_point.translate(vector);
		this.__rect.translate(vector);
	}

	/**
	 * 
	 * @param {Point} begin_point 
	 */
	setBeginPoint(begin_point) {
		this.__begin_point = begin_point;
		this.__updateScale();
	}

	/**
	 * 
	 * @returns Point
	 */
	getBeginPoint() {
		return this.__begin_point;
	}

	/**
	 * 
	 * @param {Point} end_point 
	 */
	setEndPoint(end_point) {
		this.__end_point = end_point;
		this.__updateScale();
	}

	/**
	 * 
	 * @returns Point
	 */
	getEndPoint() {
		return this.__end_point;
	}

	/**
	 * 
	 * @param {Float} upper_bound 
	 */
	setUpperBound(upper_bound) {
		this.__upper_bound = upper_bound;
		this.__updateScale();
	}

	/**
	 * 
	 * @returns Float
	 */
	getUpperBound() {
		return this.__upper_bound;
	}

	/**
	 * 
	 * @param {Float} lower_bound 
	 */
	setLowerBound(lower_bound) {
		this.__lower_bound = lower_bound;
		this.__updateScale();
	}

	/**
	 * 
	 * @returns Float
	 */
	getLowerBound() {
		return this.__lower_bound;
	}

	__updateScale() {
		this.__scale = (this.__upper_bound - this.__lower_bound) / this.len();
	}

	// /**
	//  * 
	//  * @param {Float} upper_scroll 
	//  */
	// setUpperScroll(upper_scroll) {
	// 	this.__upper_scroll = upper_scroll;
	// }

	// setLowerScroll(lower_scroll) {

	// }

	/**
	 * 
	 * @param {Display} display 
	 */
	setDisplay(display) {
		this.__rect.setDisplay(display);
	}

	/**
	 * 
	 * @returns Application
	 */
	getApplication() {
		return this.__application;
	}

	/**
	 * 
	 * @returns Rectangle
	 */
	getRectangle() {
		return this.__rect;
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
	 * @param {Point} point 
	 */
	contain(point) {
		return this.__rect.contain(point);
	}

	/**
	 * 
	 * @returns Float
	 */
	len() {
		let scroll_vec = Vector.from(this.__begin_point, this.__end_point);
		return scroll_vec.len();
	}
}

export { ScrollBar };

