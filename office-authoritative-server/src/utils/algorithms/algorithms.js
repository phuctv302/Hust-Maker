function time() {
	return new Date().getTime();
}

function uuid() {
	return '_uuid'+(Math.floor(Math.random()*100000))+"_"+(Math.floor(Math.random()*100000))+"_"+time();
}

export { time, uuid };
export { StackBuffer } from './stack.js';
export { HistoryBuffer } from './history.buffer.js';

