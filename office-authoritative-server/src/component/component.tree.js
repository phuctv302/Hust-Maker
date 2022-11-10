import { CommandFactory } from '../commands/command.factory.js';
import { Component } from './component.js';
import { CanvasImage } from './../shapes/shapes.js';


class ComponentTree {
	/**
	 * @var {Component[]}
	 */
	__components;

	/**
	 * @var {Float}
	 */
	__min_x;

	/**
	 * @var {Float}
	 */
	__max_x;

	/**
	 * @var {Float}
	 */
	__min_y;

	/**
	 * @var {Float}
	 */
	__max_y;

	__background_image;

	/**
	 * @var {Application}
	 */
	__application;

	/**
	 * 
	 * @param {Application} application 
	 */
	constructor(application) {
		this.__application = application;

		this.__components = [];
		this.__min_x = 0;
		this.__max_x = 0;
		this.__min_y = 0;
		this.__max_y = 0;
	}

	/**
	 * 
	 * @param {Component} component 
	 */
	updateBoundary(component) {

		if (!this.getApplication().getCanvas()) {
			return;
		}
		// TODO
		// if (component.length < 2) {
		// 	this.__min_x = component.getMinX();
		// 	this.__max_x = component.getMaxX();
		// 	this.__min_y = component.getMinY();
		// 	this.__max_y = component.getMaxY();
			
		// 	return;
		// }

		// this.__min_x = Math.min(this.__min_x, component.getMinX());
		// this.__max_x = Math.max(this.__max_x, component.getMaxX());
		// this.__min_y = Math.min(this.__min_y, component.getMinY());
		// this.__max_y = Math.max(this.__max_y, component.getMaxY());

		// console.log(this.__min_x, this.__max_x, this.__min_y, this.__max_y);
		

		/**
		 * this is shitty algorithm, need to improve later
		 */
		if (this.__components.length === 0) {
			this.__min_x = 0;
			this.__max_x = this.__application.getCanvas().getWidth();
			this.__min_y = 0;
			this.__max_y = this.__application.getCanvas().getHeight();
			return;
		}

		this.__min_x = this.__components[0].getMinX();
		this.__max_x = this.__components[0].getMaxX();
		this.__min_y = this.__components[0].getMinY();
		this.__max_y = this.__components[0].getMaxY();
		for (const component of this.__components) {
			this.__min_x = Math.min(this.__min_x, component.getMinX());
			this.__max_x = Math.max(this.__max_x, component.getMaxX());
			this.__min_y = Math.min(this.__min_y, component.getMinY());
			this.__max_y = Math.max(this.__max_y, component.getMaxY());
		}

		this.getApplication().getDualScrollBar().updateScrollBar();

		// console.log(this.__min_x, this.__max_x, this.__min_y, this.__max_y);
	}

	/**
	 * 
	 * @param {Component} component 
	 */
	add(component) {
		this.__components.push(component);
		component.setComponentTree(this);
	}

	setBackground(image) {
		this.__background_image = image;
	}

	/**
	 * 
	 * @returns Component[]
	 */
	getComponents() {
		return this.__components;
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
	 * @returns Float
	*/
	getMinX() {
		return this.__min_x;
	}

	/**
	 * 
	 * @returns Float
	 */
	getMaxX() {
		return this.__max_x;
	}

		/**
	 * 
	 * @returns Float
	 */
	getMinY() {
		return this.__min_y;
	}
	
	/**
	 * 
	 * @returns Float
	 */
	getMaxY() {
		return this.__max_y;
	}

	/**
	 * 
	 * @param {string} component_id 
	 * @returns Component
	 */
	getComponentById(component_id) {
		for (const component of this.getComponents()) {
			let res = component.findComponentById(component_id);

			if (res) {
				return res;
			}
		}
		
		return null;
	}

	render() {
		if (this.__background_image) {
			this.__background_image.render();
		}
		
		// this.__drawGrid();

		for (const component of this.getComponents()) {
			component.render();
		}
	}

	__drawGrid() {
		let canvas = this.getApplication().getCanvas();
		const SCALE = canvas.getScale();

		if (SCALE < 0.125) {
			return;
		}

		let context = canvas.getContext2d();

		context.save();

		const GRID_COLOR = "#eeeeee";
		const CELL_SIZE = ComponentTree.getCellSize() * SCALE;
		const HEIGHT = Math.floor(canvas.getHeight() / CELL_SIZE) + 2;
		const WIDTH = Math.floor(canvas.getWidth() / CELL_SIZE) + 2;


		let origin =  canvas.getOrigin().clone().opposite();
		origin.x = Math.floor(origin.x / CELL_SIZE) * CELL_SIZE;
		origin.y = Math.floor(origin.y / CELL_SIZE) * CELL_SIZE;
		context.translate(origin.x, origin.y);

		context.beginPath();
		context.strokeStyle = GRID_COLOR;


		// Vertical lines.
		for (let i = 0; i <= WIDTH; i++) {
			context.moveTo(i * (CELL_SIZE) + 1, 0);
			context.lineTo(i * (CELL_SIZE) + 1, (CELL_SIZE) * HEIGHT + 1);
		}

		// Horizontal lines.
		for (let j = 0; j <= HEIGHT; j++) {
			context.moveTo(0						, j * (CELL_SIZE) + 1);
			context.lineTo((CELL_SIZE ) * WIDTH + 1	, j * (CELL_SIZE) + 1);
		}

		context.stroke();

		context.restore();
	}

	static getCellSize() {
		return 100;
	}

	/**
	 * 
	 * @param {Point} point 
	 */
	getCellPositionOnGridByPoint(point) {
		const SCALE = this.getApplication().getCanvas().getScale();
		const CELL_SIZE = ComponentTree.getCellSize();


		let point_clone = point.clone().dynIntoVector().scale(1/SCALE).dynIntoPoint();

		
		point_clone.x = Math.floor(point_clone.x / CELL_SIZE) * CELL_SIZE;
		point_clone.y = Math.floor(point_clone.y / CELL_SIZE) * CELL_SIZE;

		return point_clone;//.dynIntoVector().scale(1/SCALE).dynIntoPoint();
	}

	/**
	 * 
	 * @param {Point} point 
	 */
	getCellPositionOnGridByAbsolutePoint(point) {

		const CELL_SIZE = ComponentTree.getCellSize();


		let point_clone = point.clone();

		
		point_clone.x = Math.floor(point_clone.x / CELL_SIZE) * CELL_SIZE;
		point_clone.y = Math.floor(point_clone.y / CELL_SIZE) * CELL_SIZE;

		return point_clone;//.dynIntoVector().scale(1/SCALE).dynIntoPoint();
	}

	getCommandsToCreateTree() {
		let commands = [];

		for (const component of this.getComponents()) {
			commands.push(CommandFactory.getPropsCreationCommandFromComponent(component));
		}
		
		return commands;
	}
}

export { ComponentTree };

