import { Shape, ShapeType } from './shape.js';
import { Rectangle } from './rectangle.js';
import { CanvasImage } from './image.js';


class ShapeFactory {
	/**
	 * 
	 * @param {Object} props 
	 * @returns Shape
	 */
	static create(props) {
		if (props.type == ShapeType.SHAPE) {
			return new Shape(props);
		}

		if (props.type == ShapeType.RECTANGLE) {
			return new Rectangle(props);
		}

		if (props.type == ShapeType.IMAGE) {
			return new CanvasImage(props);
		}
		
		return null;
	}
}

export { ShapeFactory };

