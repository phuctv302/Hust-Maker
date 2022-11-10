import { ScrollBar } from './scroll.bar.js';
import { Rectangle, Point, Vector } from './../../shapes/shapes.js';



class HorizontalScrollBar extends ScrollBar {
	/**
	 * 
	 * @param {Application} application 
	 */
	constructor(application) {
		super(application);

		const PADDING = 5;
		const SIZE = 10;

		this.__upper_bound = this.getApplication().getCanvas().getWidth();
		this.__lower_bound = 0;
		this.__begin_point = new Point({
			x: PADDING + SIZE,
			y: this.getApplication().getCanvas().getHeight() - PADDING - SIZE,
		});
		this.__end_point = new Point({
			x: this.getApplication().getCanvas().getWidth() - 2 * PADDING - SIZE,
			y: this.getApplication().getCanvas().getHeight() - PADDING - SIZE,
		});

		this.__updateScale();

		this.__rect = new Rectangle({
			x: this.__begin_point.x,
			y: this.__begin_point.y,
			width: 100,
			height: SIZE,
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
		vector.y = 0;
		this.translate(vector.clone());
		// this.getApplication().getCanvas().translate(vector.clone().rev());


		vector.scale(this.__scale);
		// console.log(vector, this.__scale);

		this.getApplication().getCanvas().translate(vector.clone().rev());
		this.translateAll(vector.clone());
	}

	wheel() {
		
	}
}

export { HorizontalScrollBar };


