class KeyEventListener extends EventListener {
	/**
	 * @var {Int[]}
	 */
	__keys;

	constructor(key_event_type, handler_function) {
		this.__event_type = key_event_type;

		window.removeEventListener(this.__event_type);
		window.addEventListener(this.__event_type, function(event) {
			handler_function(event);
		});
	}
}