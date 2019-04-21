class Events {
	constructor(canvas) {
		this.canvas = canvas;
		this.mousePosition;
	}

	getMouseClick() {
		var me = this;

		me.canvas.onclick = function(evt) {
			me.mousePosition = me.getMousePosition(me.canvas, evt);
		}
		
		return me.mousePosition;
	}

	getMouseOver() {
		var me = this;

		me.canvas.onmousemove = function(evt) {
			me.mousePosition = me.getMousePosition(me.canvas, evt);
		}
		
		return me.mousePosition;
	}
	
	getMousePosition(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}
}

export default Events;