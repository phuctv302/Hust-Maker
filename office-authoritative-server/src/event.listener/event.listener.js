
// TODO
class EventListener {

	/**
	 * @var {String}
	 */
	__event_type;

	/**
	 * @var {function}
	 */
	__handler_function;

	constructor(event_type, handler_function) {

		this.__event_type = event_type;

		window.removeEventListener(this.__event_type);
		window.addEventListener(this.__event_type, function(event) {
			handler_function(event);
		});
	}
}

// class Qe extends jt{
// 	constructor(t){
// 		super(t);
// 		this._transforming=!1;
// 		this._createElements();
// 		this._handleMouseMove=this._handleMouseMove.bind(this);
// 		this._handleMouseUp=this._handleMouseUp.bind(this);
// 		this.update=this.update.bind(this);
// 		this.on(He,this.update);
// 	}
// }