import { StackBuffer } from './stack.js';

class HistoryBuffer extends StackBuffer {
	__is_change;

	constructor() {
		super();
		this.__is_change = false;
	}

	pop() {
		return null;
	}

	push(item) {
		super.push(item);
		this.__is_change = true;
	}

	setChange(change) {
		this.__is_change = change;
	}

	isChange() {
		return this.__is_change;
	}
}


export { HistoryBuffer };

