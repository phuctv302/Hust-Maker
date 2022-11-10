import { Vector } from './../../shapes/vector.js';
import { Point } from './../../shapes/point.js';
import { HorizontalScrollBar } from './horizontal.scroll.bar.js';
import { VerticalScrollBar } from './vertical.scroll.bar.js';


const ScrollBarType = {
	HORIZONTAL_SCROLL_BAR: "HORIZONTAL_SCROLL_BAR",
	VERTICAL_SCROLL_BAR: "VERTICAL_SCROLL_BAR",
}

class DualScrollBar {
	/**
	 * @var {Application}
	 */
	__application;

	/**
	 * @var {HorizontalScrollBar}
	 */
	__horizontal_scroll_bar;

	/**
	 * @var {VerticalScrollBar}
	 */
	__vertical_scroll_bar;

	/**
	 * @var {ScrollBarType}
	 */
	__selected_scroll_bar_type;

	/**
	 * 
	 * @param {Application} application 
	 */
	constructor(application) {
		this.__application = application;
		this.__horizontal_scroll_bar = new HorizontalScrollBar(application);
		this.__vertical_scroll_bar = new VerticalScrollBar(application);
	}

	/**
	 * 
	 * @param {Point} point 
	 */
	contain(point) {
		if (this.__horizontal_scroll_bar.contain(point)) {
			this.__selected_scroll_bar_type = ScrollBarType.HORIZONTAL_SCROLL_BAR;
			return true;
		}

		if (this.__vertical_scroll_bar.contain(point)) {
			this.__selected_scroll_bar_type = ScrollBarType.VERTICAL_SCROLL_BAR;
			return true;
		}
		
		return false;
	}

	mouseup() {

	}

	mousedown() {

	}

	mousemove() {
		let event_handler = this.getApplication().getEventHandler();
		let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor());

		if (this.__selected_scroll_bar_type == ScrollBarType.HORIZONTAL_SCROLL_BAR) {
			this.__horizontal_scroll_bar.mousemove();
			vector.y = 0;
			this.__vertical_scroll_bar.translateAll(vector.clone().scale(this.__horizontal_scroll_bar.getScale()));
		}

		if (this.__selected_scroll_bar_type == ScrollBarType.VERTICAL_SCROLL_BAR) {
			this.__vertical_scroll_bar.mousemove();
			vector.x = 0;
			this.__horizontal_scroll_bar.translateAll(vector.clone().scale(this.__vertical_scroll_bar.getScale()));
		}
	}

	wheel() {
		// scroll using mouse
		// // ScrollBarType.VERTICAL_SCROLL_BAR
		// const SCALE = 0.5;
		// const event = this.getApplication().getEventHandler().getEvent();
		// const dx = event.originalEvent.deltaX;
		// const dy = event.originalEvent.deltaY * SCALE;

		// let vector = new Vector({x: dx, y: dy});
		// vector.scale(this.__vertical_scroll_bar.getScale());
	
		// this.getApplication().getCanvas().translate(vector.clone().rev());
		// this.translate(vector);

		// zoom in/out
		const SCALE = this.getApplication().getCanvas().getScale();
		const event = this.getApplication().getEventHandler().getEvent();
		const dx = event.originalEvent.deltaX;
		const dy = event.originalEvent.deltaY / Math.abs(event.originalEvent.deltaY) * -0.02;

		let scale = SCALE;
		if (scale + dy >= 0.02) {
			scale += dy;

			scale = Math.max(0.02, Math.min(2560, scale));
		

			this.getApplication().getCanvas().setScale(scale);
			
			
			let origin_cursor = this.getApplication().getEventHandler().getOriginCursor().clone();
			let vector = origin_cursor.dynIntoVector().scale(1/SCALE).scale(-dy);
			// console.log(vector);
			this.getApplication().getCanvas().translate(vector.clone());
			this.translate(vector.clone().rev());

			this.getApplication().getComponentTree().updateBoundary();
		}
		
	}
	

	render() {
		this.__horizontal_scroll_bar.render();
		this.__vertical_scroll_bar.render();
	}


	/**
	 * 
	 * @param {Vector} vector 
	 */
	translate(vector) {
		this.__vertical_scroll_bar.translateAll(vector.clone());
		this.__horizontal_scroll_bar.translateAll(vector.clone());
	}

	/**
	 * 
	 * @returns Application
	 */
	getApplication() {
		return this.__application;
	}
}

export { DualScrollBar };

