
class StackBuffer {
	__stack;

	constructor() {
		this.__stack = [];
	}

	push(item) {
		return this.__stack.push(item);
	}

	pop() {
		if (this.empty()) {
			return null;
		}
		return this.__stack.pop();
	}

	peek() {
		if (this.empty()) {
			return null;
		}
		return this.__stack[this.size() - 1];
	}

	size() {
		return this.__stack.length;
	}

	empty() {
		return this.size() === 0;
	}
}

export { StackBuffer };


