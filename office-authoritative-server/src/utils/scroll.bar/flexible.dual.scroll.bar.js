import { DualScrollBar } from './dual.scroll.bar.js';
import { Display, Point, Vector } from './../../shapes/shapes.js';


class FlexibleDualScrollBar extends DualScrollBar {

	/**
	 * 
	 * @param {Application} application 
	 */
	constructor(application) {
		super(application);
		this.updateScrollBar();
	}

	updateScrollBar() {
		const component_tree = this.getApplication().getComponentTree();
		const canvas = this.getApplication().getCanvas();

		const origin = canvas.getOrigin();
		const canvas_width = canvas.getWidth();
		const canvas_height = canvas.getHeight();

		this.__horizontal_scroll_bar.setDisplay(Display.NONE);
		if (component_tree.getMinX() < -origin.x || component_tree.getMaxX() > -origin.x + canvas_width) {
			this.__horizontal_scroll_bar.setDisplay(Display.BLOCK);

			const lower_bound = Math.min(component_tree.getMinX(), -origin.x);
			const upper_bound = Math.max(component_tree.getMaxX(), -origin.x + canvas_width);

			this.__horizontal_scroll_bar.setUpperBound(upper_bound);
			this.__horizontal_scroll_bar.setLowerBound(lower_bound);

			let vector = Vector.from(
				new Point({
					x: this.__horizontal_scroll_bar.getLowerBound(), 
					y: this.__horizontal_scroll_bar.getBeginPoint().y,
				}), 
				new Point({
					x: -origin.x,
					y: this.__horizontal_scroll_bar.getBeginPoint().y,
				}),
			);

			vector.scale(1/this.__horizontal_scroll_bar.getScale());
			let new_pos_scroll = this.__horizontal_scroll_bar.getBeginPoint().clone().translate(vector.clone());

			this.__horizontal_scroll_bar.getRectangle().setX(new_pos_scroll.x);
			this.__horizontal_scroll_bar.getRectangle().setY(new_pos_scroll.y);
			this.__horizontal_scroll_bar.getRectangle().setWidth(
				this.getApplication().getCanvas().getWidth() / this.__horizontal_scroll_bar.getScale()
			);
			
		}

		this.__vertical_scroll_bar.setDisplay(Display.NONE);
		if (component_tree.getMinY() < -origin.y || component_tree.getMaxY() > -origin.y + canvas_height) {
			this.__vertical_scroll_bar.setDisplay(Display.BLOCK);

			const lower_bound = Math.min(component_tree.getMinY(), -origin.y);
			const upper_bound = Math.max(component_tree.getMaxY(), -origin.y + canvas_height);

			this.__vertical_scroll_bar.setUpperBound(upper_bound);
			this.__vertical_scroll_bar.setLowerBound(lower_bound);

			let vector = Vector.from(
				new Point({
					x: this.__vertical_scroll_bar.getBeginPoint().x,
					y: this.__vertical_scroll_bar.getLowerBound(), 
				}), 
				new Point({
					x: this.__vertical_scroll_bar.getBeginPoint().x,
					y: -origin.y,
				}),
			);

			vector.scale(1/this.__vertical_scroll_bar.getScale());
			let new_pos_scroll = this.__vertical_scroll_bar.getBeginPoint().clone().translate(vector.clone());

			this.__vertical_scroll_bar.getRectangle().setX(new_pos_scroll.x);
			this.__vertical_scroll_bar.getRectangle().setY(new_pos_scroll.y);
			this.__vertical_scroll_bar.getRectangle().setHeight(
				this.getApplication().getCanvas().getHeight() / this.__vertical_scroll_bar.getScale()
			);
		}
	}

	mousemove() {
		super.mousemove();
	}

	mouseup() {
		super.mouseup();
		this.updateScrollBar();
	}

	wheel() {
		super.wheel();
		this.updateScrollBar();
	}
}

export { FlexibleDualScrollBar };
