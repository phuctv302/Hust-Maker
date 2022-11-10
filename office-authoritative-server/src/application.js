import { EventHandler } from './event.handler.js';
import { Canvas } from './canvas.js';
import { ComponentTree } from './component/components.js';
import { FlexibleDualScrollBar } from './utils/scroll.bar/scroll.bars.js';
import { SelectorHelper } from './utils/helpers/helpers.js';
import { uuid } from './utils/algorithms/algorithms.js';
import { UI } from './ui/ui.js';


class Application {
	/**
	 * @var {Canvas}
	 */
	__canvas;

	/**
	 * @var {EventHandler}
	 */
	__event_handler;

	/**
	 * @var {ComponentTree}
	 */
	__component_tree;

	/**
	 * @var {FlexibleDualScrollBar}
	 */
	__dual_scroll_bar;

	/**
	 * @var {SelectorHelper}
	 */
	__selector_helper;

	/**
	 * @var {string}
	 */
	__session_id;

	/**
	 * @var {UI}
	 */
	__ui;

	/**
	 * 
	 * @param {Canvas} canvas 
	 */
	constructor(canvas) {
		this.__canvas = canvas;
		this.__event_handler = new EventHandler(this);

		this.__component_tree = new ComponentTree(this);

		// init scroll bar;
		this.__dual_scroll_bar = new FlexibleDualScrollBar(this);

		this.__selector_helper = new SelectorHelper(this);
		this.__session_id = uuid();

		this.__ui = new UI(this);
	}

	clear() {
		this.__canvas.clear();
	}

	render() {
		this.clear();
		
		this.__component_tree.render();

		this.__selector_helper.render();
		this.__dual_scroll_bar.render();
		
		this.__ui.render();
	}

	/**
	 * 
	 * @param {Shape} shape 
	 */
	append(shape) {
		this.__component_tree.add(shape);
		this.render();
	}

	/**
	 * 
	 * @returns Canvas
	 */
	getCanvas() {
		return this.__canvas;
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
	 * @returns Object
	 */
	getComponentTree() {
		return this.__component_tree;
	}

	/**
	 * 
	 * @returns ScrollBar{}
	 */
	getDualScrollBar() {
		return this.__dual_scroll_bar;
	}

	getSelectorHelper() {
		return this.__selector_helper;
	}

	getSessionId() {
		return this.__session_id;
	}
}


export { Application };


