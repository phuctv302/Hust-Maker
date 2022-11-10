import { Shape, ShapeType, Display } from './shape.js';
import { Point } from './point.js';
import { Vector } from './vector.js';

class Rectangle extends Shape {
	/**
	 * @var {Float} __x
	 */
	__x;

	/**
	 * @var {Float} __y
	 */
	__y;

	/**
	 * @var {Float} __width
	 */
	__width;

	/**
	 * @var {Float} __height
	 */
	__height;

	/**
	 * @var {Float} __angle -- in radians
	 */
	__angle;

	/**
	 * 
	 * @param {Object} props 
	 */
	constructor(props) {
		super(props);

		this.__x = props.x;
		this.__y = props.y;
		this.__width = props.width;
		this.__height = props.height;
		this.__angle = props.angle;

		this.__type = ShapeType.RECTANGLE;
	}

	render() {
		if (this.__display == Display.NONE) {
			return;
		}

		super.render();

		const SCALE = this.getScale();
		
		let context = this.getEventHandler().getApplication().getCanvas().getContext2d();
		context.save();

		context.globalAlpha = this.__opacity;
		context.fillStyle = this.__fill;
		context.strokeStyle = this.__stroke;

		context.translate(SCALE * (this.__x + this.__width / 2), SCALE * (this.__y + this.__height / 2));
		context.rotate(this.__angle);

		context.fillRect(SCALE * this.__width / -2, SCALE * this.__height / -2, SCALE * this.__width, SCALE * this.__height);
		context.strokeRect(SCALE * this.__width / -2, SCALE * this.__height / -2, SCALE * this.__width, SCALE * this.__height);
		context.restore();
	}

	mousedown() {

	}

	mousemove() {
		let event_handler = this.getEventHandler();
		let vector = Vector.from(event_handler.getLastCursor(), event_handler.getCursor()).scale(1/this.getScale());
		this.translate(vector);
	}

	mouseup() {
		
	}

	/**
	 * 
	 * @param {Vector} vector 
	 */
	translate(vector) {
		let v = vector.clone();
		this.__x += v.x;
		this.__y += v.y;
	}

	/**
	 * 
	 * @param {Point} point 
	 * @returns boolean
	 */
	contain(point) {
		const SCALE = this.getScale();
		let p = this.convertPointToLocalCoordinate(point);

		// let p = point
		// 	.clone()
		// 	.translate(new Vector({x: -SCALE * (this.__x + this.__width/2), y: -SCALE * (this.__y + this.__height/2),}))
		// 	.dynIntoVector()
		// 	.rotate(-this.__angle)
		// 	.dynIntoPoint();

		// console.log('point: ', p);
		// // return true;

		if (p.x > -SCALE * this.__width/2 && p.x < SCALE * this.__width/2 && p.y > -SCALE * this.__height/2 && p.y < SCALE * this.__height/2) {
			return true;
		}

		return false;
	}

	/**
	 * 
	 * @param {Float} height 
	 */
	setHeight(height) {
		this.__height = height;
	}

	/**
	 * 
	 * @returns Float
	 */
	getHeight() {
		return this.__height;
	}

	/**
	 * 
	 * @param {Float} width 
	 */
	setWidth(width) {
		this.__width = width;
	}

	/**
	 * 
	 * @returns Float
	 */
	getWidth() {
		return this.__width;
	}

	/**
	 * 
	 * @param {Float} x 
	 */
	setX(x) {
		this.__x = x;
	}

	/**
	 * 
	 * @returns Float
	 */
	getX() {
		return this.__x;
	}

	/**
	 * 
	 * @param {Float} y 
	 */
	setY(y) {
		this.__y = y;
	}

	/**
	 * 
	 * @returns Float
	 */
	getY() {
		return this.__y;
	}

	/**
	 * 
	 * @returns Float
	 */
	getAngle() {
		return this.__angle;
	}

	/**
	 * 
	 * @returns Float
	 */
	 getMinX() {
		const SCALE = this.getScale();
		return SCALE * this.__x;
	}

	/**
	 * 
	 * @returns Float
	 */
	getMaxX() {
		const SCALE = this.getScale();
		return SCALE * (this.__x + this.__width);
	}

	/**
	 * 
	 * @returns Float
	 */
	getMinY() {
		const SCALE = this.getScale();
		return SCALE * this.__y;
	}

	/**
	 * 
	 * @returns Float
	 */
	getMaxY() {
		const SCALE = this.getScale();
		return SCALE * (this.__y + this.__height);
	}

	/**
	 * 
	 * @param {Point} point 
	 */
	convertPointToLocalCoordinate(point) {
		const SCALE = this.getScale();
		let vector = new Vector({
			x: -SCALE * (this.__x + this.__width/2), 
			y: -SCALE * (this.__y + this.__height/2),
		});

		let local_point = point
			.clone()
			.translate(vector)
			.dynIntoVector()
			.rotate(-this.__angle)
			.dynIntoPoint();

		return local_point;
	}

	/**
	 * 
	 * @param {Point} point 
	 * @returns 
	 */
	convertPointToGlobalCoordinate(point) {
		const SCALE = this.getScale();
		let vector = new Vector({
			x: -SCALE * (this.__x + this.__width/2), 
			y: -SCALE * (this.__y + this.__height/2),
		});

		console.log('origin: ', point);
		let global_point = point
			.clone()
			.dynIntoVector()
			.rotate(this.__angle)
			.dynIntoPoint()
			.translate(vector.rev());

		console.log('global: ', global_point);
		return global_point;
	}

	/**
	 * 
	 * @param {Vector} vector 
	 * @returns Vector
	 */
	convertVectorToLocalCoordinate(vector) {
		return vector.clone().rotate(-this.getAngle());
	}

	/**
	 * 
	 * @param {Vector} vector 
	 * @returns Vector
	 */
	convertVectorToGlobalCoordinate(vector) {
		return vector.clone().rotate(this.getAngle());
	}

	resize_top(vector) {
		let local_vector = this.convertVectorToLocalCoordinate(vector);
		local_vector.x = Math.round(local_vector.x);
		local_vector.y = Math.round(local_vector.y);
		local_vector.x = 0;

		let point_a = new Point({x: -this.getWidth()/2, y: -this.getHeight()/2});
		let point_c = new Point({x: +this.getWidth()/2, y: +this.getHeight()/2});
		let local_point = point_a.clone().translate(local_vector);

		let new_center = Point.midpoint(local_point, point_c);
		let vec_1 = new_center.dynIntoVector().rev();
		let vec_2 = vec_1.clone().rotate(this.getAngle());
		let vec_3 = vec_1.clone().sub(vec_2.clone());

		let global_point = local_point
			.clone()
			.translate(new Vector({
				x: -(this.__x + this.__width/2), 
				y: -(this.__y + this.__height/2),
			}).rev())
			.translate(vec_3);

		let width = this.getWidth() / 2 - local_point.x;
		let height = this.getHeight() / 2 - local_point.y;

		this.setX(global_point.x);
		this.setY(global_point.y);
		this.setWidth(width);
		this.setHeight(height);
	}

	resize_bottom(vector) {
		let local_vector = this.convertVectorToLocalCoordinate(vector);
		local_vector.x = Math.round(local_vector.x);
		local_vector.y = Math.round(local_vector.y);
		local_vector.x = 0;

		let point_a = new Point({x: -this.getWidth()/2, y: -this.getHeight()/2});
		let point_b = new Point({x: +this.getWidth()/2, y: -this.getHeight()/2});
		// let point_c = new Point({x: +this.getWidth()/2, y: +this.getHeight()/2});
		let point_d = new Point({x: -this.getWidth()/2, y: +this.getHeight()/2});

		let local_point = point_d.clone().translate(local_vector);
		let new_center = Point.midpoint(local_point, point_b);

		let vec_1 = new_center.dynIntoVector().rev();
		let vec_2 = vec_1.clone().rotate(this.getAngle());
		let vec_3 = vec_1.clone().sub(vec_2.clone());

		let vec = local_vector.clone();
		vec.y = 0;
		let new_point_a = point_a.clone().translate(vec);
		let global_point = new_point_a
			.clone()
			.translate(new Vector({
				x: -(this.__x + this.__width/2), 
				y: -(this.__y + this.__height/2),
			}).rev())
			.translate(vec_3);

		let width = this.getWidth() / 2 - local_point.x;
		let height = this.getHeight() / 2 + local_point.y;

		this.setX(global_point.x);
		this.setY(global_point.y);
		this.setWidth(width);
		this.setHeight(height);
	}

	resize_left(vector) {
		let local_vector = this.convertVectorToLocalCoordinate(vector);
		local_vector.x = Math.round(local_vector.x);
		local_vector.y = Math.round(local_vector.y);
		local_vector.y = 0;

		let point_a = new Point({x: -this.getWidth()/2, y: -this.getHeight()/2});
		let point_c = new Point({x: +this.getWidth()/2, y: +this.getHeight()/2});
		let local_point = point_a.clone().translate(local_vector);

		let new_center = Point.midpoint(local_point, point_c);
		let vec_1 = new_center.dynIntoVector().rev();
		let vec_2 = vec_1.clone().rotate(this.getAngle());
		let vec_3 = vec_1.clone().sub(vec_2.clone());

		let global_point = local_point
			.clone()
			.translate(new Vector({
				x: -(this.__x + this.__width/2), 
				y: -(this.__y + this.__height/2),
			}).rev())
			.translate(vec_3);

		let width = this.getWidth() / 2 - local_point.x;
		let height = this.getHeight() / 2 - local_point.y;

		this.setX(global_point.x);
		this.setY(global_point.y);
		this.setWidth(width);
		this.setHeight(height);
	}

	resize_right(vector) {
		let local_vector = this.convertVectorToLocalCoordinate(vector);
		local_vector.x = Math.round(local_vector.x);
		local_vector.y = Math.round(local_vector.y);
		local_vector.y = 0;

		let point_a = new Point({x: -this.getWidth()/2, y: -this.getHeight()/2});
		let point_b = new Point({x: +this.getWidth()/2, y: -this.getHeight()/2});
		// let point_c = new Point({x: +this.getWidth()/2, y: +this.getHeight()/2});
		let point_d = new Point({x: -this.getWidth()/2, y: +this.getHeight()/2});

		let local_point = point_b.clone().translate(local_vector);
		let new_center = Point.midpoint(local_point, point_d);

		let vec_1 = new_center.dynIntoVector().rev();
		let vec_2 = vec_1.clone().rotate(this.getAngle());
		let vec_3 = vec_1.clone().sub(vec_2.clone());

		let vec = local_vector.clone();
		vec.x = 0;
		let new_point_a = point_a.clone().translate(vec);
		let global_point = new_point_a
			.clone()
			.translate(new Vector({
				x: -(this.__x + this.__width/2), 
				y: -(this.__y + this.__height/2),
			}).rev())
			.translate(vec_3);

		let width = this.getWidth() / 2 + local_point.x;
		let height = this.getHeight() / 2 - local_point.y;

		this.setX(global_point.x);
		this.setY(global_point.y);
		this.setWidth(width);
		this.setHeight(height);
	}

	resize_top_left(vector) {
		let local_vector = this.convertVectorToLocalCoordinate(vector);
		local_vector.x = Math.round(local_vector.x);
		local_vector.y = Math.round(local_vector.y);


		let point_a = new Point({x: -this.getWidth()/2, y: -this.getHeight()/2});
		let point_c = new Point({x: +this.getWidth()/2, y: +this.getHeight()/2});
		let local_point = point_a.clone().translate(local_vector);

		let new_center = Point.midpoint(local_point, point_c);
		let vec_1 = new_center.dynIntoVector().rev();
		let vec_2 = vec_1.clone().rotate(this.getAngle());
		let vec_3 = vec_1.clone().sub(vec_2.clone());

		let global_point = local_point
			.clone()
			.translate(new Vector({
				x: -(this.__x + this.__width/2), 
				y: -(this.__y + this.__height/2),
			}).rev())
			.translate(vec_3);

		let width = this.getWidth() / 2 - local_point.x;
		let height = this.getHeight() / 2 - local_point.y;

		this.setX(global_point.x);
		this.setY(global_point.y);
		this.setWidth(width);
		this.setHeight(height);
	}

	resize_top_right(vector) {
		let local_vector = this.convertVectorToLocalCoordinate(vector);
		local_vector.x = Math.round(local_vector.x);
		local_vector.y = Math.round(local_vector.y);

		let point_a = new Point({x: -this.getWidth()/2, y: -this.getHeight()/2});
		let point_b = new Point({x: +this.getWidth()/2, y: -this.getHeight()/2});
		// let point_c = new Point({x: +this.getWidth()/2, y: +this.getHeight()/2});
		let point_d = new Point({x: -this.getWidth()/2, y: +this.getHeight()/2});

		let local_point = point_b.clone().translate(local_vector);
		let new_center = Point.midpoint(local_point, point_d);

		let vec_1 = new_center.dynIntoVector().rev();
		let vec_2 = vec_1.clone().rotate(this.getAngle());
		let vec_3 = vec_1.clone().sub(vec_2.clone());

		let vec = local_vector.clone();
		vec.x = 0;
		let new_point_a = point_a.clone().translate(vec);
		let global_point = new_point_a
			.clone()
			.translate(new Vector({
				x: -(this.__x + this.__width/2), 
				y: -(this.__y + this.__height/2),
			}).rev())
			.translate(vec_3);

		let width = this.getWidth() / 2 + local_point.x;
		let height = this.getHeight() / 2 - local_point.y;

		this.setX(global_point.x);
		this.setY(global_point.y);
		this.setWidth(width);
		this.setHeight(height);
	}

	resize_bottom_left(vector) {
		let local_vector = this.convertVectorToLocalCoordinate(vector);
		local_vector.x = Math.round(local_vector.x);
		local_vector.y = Math.round(local_vector.y);

		let point_a = new Point({x: -this.getWidth()/2, y: -this.getHeight()/2});
		let point_b = new Point({x: +this.getWidth()/2, y: -this.getHeight()/2});
		// let point_c = new Point({x: +this.getWidth()/2, y: +this.getHeight()/2});
		let point_d = new Point({x: -this.getWidth()/2, y: +this.getHeight()/2});

		let local_point = point_d.clone().translate(local_vector);
		let new_center = Point.midpoint(local_point, point_b);

		let vec_1 = new_center.dynIntoVector().rev();
		let vec_2 = vec_1.clone().rotate(this.getAngle());
		let vec_3 = vec_1.clone().sub(vec_2.clone());

		let vec = local_vector.clone();
		vec.y = 0;
		let new_point_a = point_a.clone().translate(vec);
		let global_point = new_point_a
			.clone()
			.translate(new Vector({
				x: -(this.__x + this.__width/2), 
				y: -(this.__y + this.__height/2),
			}).rev())
			.translate(vec_3);

		let width = this.getWidth() / 2 - local_point.x;
		let height = this.getHeight() / 2 + local_point.y;

		this.setX(global_point.x);
		this.setY(global_point.y);
		this.setWidth(width);
		this.setHeight(height);
	}

	resize_bottom_right(vector) {
		let local_vector = this.convertVectorToLocalCoordinate(vector);
		local_vector.x = Math.round(local_vector.x);
		local_vector.y = Math.round(local_vector.y);

		let point_a = new Point({x: -this.getWidth()/2, y: -this.getHeight()/2});
		// let point_b = new Point({x: +this.getWidth()/2, y: -this.getHeight()/2});
		let point_c = new Point({x: +this.getWidth()/2, y: +this.getHeight()/2});
		// let point_d = new Point({x: -this.getWidth()/2, y: +this.getHeight()/2});

		let local_point = point_c.clone().translate(local_vector);
		let new_center = Point.midpoint(local_point, point_a);

		let vec_1 = new_center.dynIntoVector().rev();
		let vec_2 = vec_1.clone().rotate(this.getAngle());
		let vec_3 = vec_1.clone().sub(vec_2.clone());

		// let vec = local_vector.clone();
		// vec.x = 0;
		// let new_point_a = point_a.clone().translate(vec);
		let global_point = point_a
			.clone()
			.translate(new Vector({
				x: -(this.__x + this.__width/2), 
				y: -(this.__y + this.__height/2),
			}).rev())
			.translate(vec_3);

		let width = this.getWidth() / 2 + local_point.x;
		let height = this.getHeight() / 2 + local_point.y;

		this.setX(global_point.x);
		this.setY(global_point.y);
		this.setWidth(width);
		this.setHeight(height);
	}

}

export { Rectangle };