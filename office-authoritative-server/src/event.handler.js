import { StackBuffer } from './utils/algorithms/stack.js';
import { HistoryBuffer } from './utils/algorithms/history.buffer.js';
import { Point } from './shapes/point.js';
import { Vector } from './shapes/vector.js';
import { SocketClient } from './utils/socket.io/socket.client.js';
import { CommandFactory, CommandType } from './commands/commands.js';



class EventHandler {
	/**
	 * @var {Canvas}
	 */
	__application;

	/**
	 * @var {Point}
	 */
	__cursor;

	/**
	 * @var {Point}
	 */
	__last_cursor;


	__event;

	/**
	 * @var {StackBuffer}
	 */
	__redo_buffer;

	/**
	 * @var {StackBuffer}
	 */
	__undo_buffer;

	/**
	 * @var {HistoryBuffer}
	 */
	__history_buffer;


	/**
	 * @var {SocketClient}
	 */
	__socket_client;


	__selected_object;
	__is_mousedown = false;
	__is_mouseenter = false;
	__is_scroll_bar = false;
	__my_req;

	/**
	 * 
	 * @param {Application} application 
	 */
	constructor(application) {
		let that = this;
		this.__application = application;
		this.__last_cursor = new Point({x: 0, y: 0,});
		this.__cursor = new Point({x: 0, y: 0,});

		this.__redo_buffer = new StackBuffer();
		this.__undo_buffer = new StackBuffer();
		this.__history_buffer = new HistoryBuffer();

		this.__socket_client = new SocketClient({
			ip: "https://localhost",
			port: 8080,
			token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NjUzNzUxMzl9.o4Gs5VZTm5Yk9emq7o3en-pmpGffVo9EPui22xuCEQIXzQsskDgvKQSukdrEFe7Uu__LUh8m9UFX2zAmJyfASGO2v34BcKF7bmplT7HK8uTzJcLnI2UuzK_eap1P5-1dXPYbvvy5nGxLZcIIZynD7atHd_yzJ9AsH5ugcaDsDzEPDwfwRr3Z9WrMOj8vlPYI0A0PE0euUjoyowcuU8XUGtAAp5I0yImVYtIgYUOody0x7WmwEYid3c9YEzARpgTb_Dh6ljuDpoG46pP4iSN3iNEnzZVkYgjS_E3HCF8N995DhII8zvM33EKWNN2AwI0rs-2a77Smh1zcB50Xs_MKuueyeL2E90DttSnK0n7J1wTdn53rsqHNUde5dUyMo9NOVEyrlQm67HeUhCR0EtC-hcVf36uvhsy4pYN4zPGdF59G3Fux9r_Zr-DtFRXDek1al5LLiTT3BKm9ml8BUXejzaqEmRBb5ONG2xLiIa9pt_2KRDswV9BHoNovtK0vIhWd',
		});

		this.getSocketClient().on('edit-on-client', (data) => {
			let command = CommandFactory.create(that.getApplication(), data);
			command.execute();
		});


		$(window).unbind('mousedown');
		$(window).on('mousedown', function(event) {
			that.__handleMousedonwEvent(event);
		});

		$(window).unbind('mouseup');
		$(window).on('mouseup', function(event) {
			that.__handleMouseupEvent(event);
		});

		$(window).unbind('mousemove');
		$(window).on('mousemove', function(event) {
			that.__handleMousemoveEvent(event);
		});


		let canvas_jQuery_obj = this.getApplication().getCanvas().getJQueryObject();
		canvas_jQuery_obj.unbind('wheel');
		canvas_jQuery_obj.on('wheel', function(event) {
			that.__handleWheelEvent(event);
		});
	}

	__handleMousedonwEvent(event) {
		this.setEvent(event);
		event.preventDefault(); // prevent select text when mouse down
		this.setCursorFromEvent(event);
		this.getLastCursor().set(this.getCursor());

		const origin_pos = this.getOriginCursor();


		this.__selected_object = null;
		this.__is_mousedown = true;
		this.__is_scroll_bar = false;


		const scroll_bar = this.getApplication().getDualScrollBar();
		if (scroll_bar.contain(origin_pos)) {
			this.__selected_object = scroll_bar;
			this.__selected_object.mousedown();
			this.__is_scroll_bar = true;
			return;
		}



		if (this.getApplication().getSelectorHelper().contain(origin_pos)) {
			this.getApplication().getSelectorHelper().mousedown();
			this.__selected_object = this.getApplication().getSelectorHelper().getComponent();
			return;
		}


		this.getApplication().getSelectorHelper().setComponent(null);
		const objects = this.getApplication().getComponentTree().getComponents();
		for (var i = objects.length - 1; i >= 0; i--) {
			const obj = objects[i];

			if (obj.contain(origin_pos)) {
				this.selectObject(obj);
				break;
			}
		}
		this.getApplication().render();
	}

	selectObject(component) {
		this.__is_mousedown = true;
		this.__selected_object = component;
		this.__selected_object.mousedown();

		this.getApplication().getSelectorHelper().setComponent(this.__selected_object);
		this.getApplication().getSelectorHelper().mousedown();
	}

	__handleMouseupEvent(event) {
		this.setEvent(event);

		this.getApplication().getSelectorHelper().mouseup();

		if (this.__is_mousedown && this.__selected_object) {
			this.__selected_object.mouseup();
			this.getApplication().render();
		}
		
		this.__is_mousedown = false;
		cancelAnimationFrame(this.__my_req);
		this.__my_req = false;



		let history_bufer = this.getHistoryBuffer();

		if (history_bufer.isChange()) {
			let peek_command = history_bufer.peek();
			peek_command.setMergeable(false);
			
			let undo_buffer = this.getUndoBuffer();
			undo_buffer.push(peek_command.clone());
			history_bufer.setChange(false);
			
			let props = peek_command.getProps();
			let socket_client = this.getSocketClient();
			socket_client.emit('save-change', props);
		}
	}

	__handleMousemoveEvent(event) {
		const SPEED = 5;
		const DELTA = 5;
		// that.getApplication().getCanvas().clearMouseStyle();
				
		let current_cursor = this.getCursorFromEvent(event).clone();
		let scale = this.getApplication().getCanvas().getScale();
		let delta_vec = Vector.from(this.getCursor().clone(), current_cursor).scale(1/scale);
		if (delta_vec.len() < 1) {
			return;
		}

		this.setEvent(event);
		this.getLastCursor().set(this.getCursor());
		this.getCursor().set(this.getCursorFromEvent(event));

		const cursor = this.getCursor();

		this.__is_mouseenter = true;

		if (cursor.x <= DELTA || 
			cursor.x >= this.getApplication().getCanvas().getWidth() - DELTA || 
			cursor.y <= DELTA || 
			cursor.y >= this.getApplication().getCanvas().getHeight() - DELTA
			) { 
			this.__is_mouseenter = false;
		}

		if (this.__is_mouseenter){
			cancelAnimationFrame(this.__my_req);
			this.__my_req = false;
		}

		if (this.__is_mousedown && this.__selected_object) {
			if (!this.__is_mouseenter && !this.__is_scroll_bar) {
				if (!this.__my_req) {
					const moveCanvas = this.__moveCanvas;
					this.__my_req = requestAnimationFrame(moveCanvas);
				}
			}

			if (this.__is_scroll_bar) {
				this.__selected_object.mousemove();
				this.getApplication().render();
				return;
			}

			this.getApplication().getSelectorHelper().mousemove();
			this.getApplication().getSelectorHelper().update();
			this.getApplication().render();
		}
	}

	__handleWheelEvent(event) {
		this.setEvent(event);
		event.preventDefault();

		this.getApplication().getDualScrollBar().wheel();
		this.getApplication().getSelectorHelper().update();
		this.getApplication().render();
	}
	
	__moveCanvas = () => {
		const SPEED = 5;
		const DELTA = 5;
		let dx = 0;
		let dy = 0;

		const cursor = this.getCursor();
		

		if (cursor.x <= DELTA) {
			dx = -SPEED;
		}

		if (cursor.x >= this.getApplication().getCanvas().getWidth() - DELTA) {
			dx = SPEED;
		}

		if (cursor.y <= DELTA) {
			dy = -SPEED;
		}

		if (cursor.y >= this.getApplication().getCanvas().getHeight() - DELTA) {
			dy = SPEED;
		}

		let vector = new Vector({x: dx, y: dy});
		const SCALE = this.getApplication().getCanvas().getScale();

		// TODO: command here
		// this.__selected_object.translate(vector.clone().scale(1/SCALE));
		let command = CommandFactory.create(this.getApplication(), {
			component_id: this.getApplication().getSelectorHelper().getComponent().getId(),
			action: vector.clone().scale(1/SCALE),
			data: null,
			type: CommandType.MOVE,
			mergeable: true,
		});
		command.execute();

		this.getApplication().getCanvas().translate(vector.clone().rev());
		this.getApplication().getDualScrollBar().translate(vector);
		this.getApplication().getDualScrollBar().updateScrollBar();
		this.getApplication().getSelectorHelper().update();
		this.getApplication().render();

		const moveCanvas = this.__moveCanvas;
		this.__my_req = requestAnimationFrame(moveCanvas);
	}


	/**
	 * 
	 * @returns Application
	 */
	getApplication() {
		return this.__application;
	}

	/**
	 * 
	 * @returns Point
	 */
	getCursor() {
		return this.__cursor;
	}

	// TODO: this function wrong when scale
	getOriginCursor() {
		/**
		 * @var {Vector}
		 */
		let vector = Vector.from(new Point({x: 0, y: 0}), this.getApplication().getCanvas().getOrigin().clone());
		return this.__cursor.clone().translate(vector.rev());
	}

	getAbsoluteCursor() {
		const SCALE = this.getApplication().getCanvas().getScale();
		return this.getOriginCursor().clone().dynIntoVector().scale(1/SCALE).dynIntoPoint();
	}

	getCursorFromEvent(event) {
		let rect = this.getApplication().getCanvas().getDOMElement().getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;
		let current_pos = new Point({x: x, y: y});

		return current_pos;
	}

	setCursorFromEvent(event) {
		let rect = this.getApplication().getCanvas().getDOMElement().getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;
		let current_pos = new Point({x: x, y: y});

		this.getCursor().set(current_pos);
	}

	/**
	 * 
	 * @returns Point
	 */
	getLastCursor() {
		return this.__last_cursor;
	}

	setEvent(event) {
		this.__event = event;
	}

	getEvent() {
		return this.__event;
	}

	getUndoBuffer() {
		return this.__undo_buffer;
	}

	getRedoBuffer() {
		return this.__redo_buffer;
	}

	getHistoryBuffer() {
		return this.__history_buffer;
	}

	getSocketClient() {
		return this.__socket_client;
	}
}

export { EventHandler };
