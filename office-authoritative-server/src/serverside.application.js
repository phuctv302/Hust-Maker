
import { ComponentTree } from './component/components.js';



class ServersideApplication {


	/**
	 * @var {ComponentTree}
	 */
	__component_tree;



	constructor() {
		this.__component_tree = new ComponentTree(this);
	}

	clear() {

	}

	render() {

	}

	/**
	 * 
	 * @param {Shape} shape 
	 */
	append(shape) {
		this.__component_tree.add(shape);
	}

	/**
	 * 
	 * @returns Canvas
	 */
	getCanvas() {
		return null;
	}

	/**
	 * 
	 * @returns EventHandler
	 */
	getEventHandler() {
		return null;
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
		return null;
	}

	getSelectorHelper() {
		return null;
	}

	getSessionId() {
		return null;
	}

	getCommandsToCreateMap() {
		return this.getComponentTree().getCommandsToCreateTree();
	}

	getComponentById(component_id) {
		return this.getComponentTree().getComponentById(component_id);
	}
}


export { ServersideApplication };
