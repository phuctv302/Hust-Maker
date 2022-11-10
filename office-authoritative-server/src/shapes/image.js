import { Rectangle } from './rectangle.js';
import { ShapeType } from './shape.js';


class CanvasImage extends Rectangle {
	__src;

	__path_2d;

	__img;

	__loaded;

	constructor(props) {
		super(props);


		this.__src = props.src;

		this.__loaded = false;

		this.__img = new Image();

		this.__img.onload = (e) => {
			// console.log(that.__img.height, that.__img.width);
			this.__loaded = true;

			// this.__img.attr('preserveAspectRatio', 'none')
			this.__img.height = this.getHeight();
			this.__img.width = this.getWidth();
			// console.log(this.__img);
			if (props.onload) {
				props.onload();
			} else {
				this.render();
			}
			// that.render();
		}

		this.__img.src = this.getSrc();

		this.__type = ShapeType.IMAGE;
		
	}

	render() {
		if (!this.__img) {
			return;
		}

		if (!this.__loaded) {
			return;
		}

		let context = this.getEventHandler().getApplication().getCanvas().getContext2d();
		context.save();
		const SCALE = this.getScale();

		context.translate(SCALE * (this.__x + this.__width / 2), SCALE * (this.__y + this.__height / 2));
		context.rotate(this.__angle);

		
		context.drawImage(this.__img, SCALE * this.__width / -2, SCALE * this.__height / -2, SCALE * this.__width, SCALE * this.__height);
		context.restore();
		// console.log(this.getSrc());
	}

	getSrc() {
		return this.__src;
	}
}

export { CanvasImage };