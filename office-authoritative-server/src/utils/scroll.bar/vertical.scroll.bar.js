import { ScrollBar } from './scroll.bar.js';
import { Rectangle, Point, Vector } from './../../shapes/shapes.js';



class VerticalScrollBar extends ScrollBar {
	/**
	 * 
	 * @param {Application} application 
	 */
	constructor(application) {
		super(application);

		const PADDING = 5;
		const SIZE = 10;

		this.__upper_bound = this.getApplication().getCanvas().getHeight();
		this.__lower_bound = 0;
		this.__begin_point = new Point({
			x: this.getApplication().getCanvas().getWidth() - PADDING - SIZE,
			y: PADDING + SIZE,
		});
		this.__end_point = new Point({
			x: this.getApplication().getCanvas().getWidth() - PADDING - SIZE,
			y: this.getApplication().getCanvas().getHeight() - 2 * PADDING - SIZE,
		});

		this.__updateScale();
		
		this.__rect = new Rectangle({
			x: this.__begin_point.x,
			y: this.__begin_point.y,
			width: SIZE,
			height: 100,
			angle: 0,
			opacity: 0.5,
			fill: "grey",
			stroke: "#ffffff",
			scalable: false,
			event_handler: this.getApplication().getEventHandler(),
		});
	}

	mousemove() {
		let event_handler = this.getApplication().getEventHandler();
		let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor());
		vector.x = 0;
		this.translate(vector.clone());

		vector.scale(this.__scale);
	
		this.getApplication().getCanvas().translate(vector.clone().rev());
		this.translateAll(vector.clone());
	}

	wheel() {
		
	}
}

export { VerticalScrollBar };


