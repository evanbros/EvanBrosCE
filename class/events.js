class Events {
	constructor(canvas) {
		this.canvas = canvas;
		this.mousePosition;
	}

	getMouseClick() {
		var me = this;

		me.canvas.onclick = function(evt) {
			me.mousePosition = me.mousePosition(me.canvas, evt);
		}
		
		return this.mousePosition;
	}

	getMouseOver() {
		var me = this;

		me.canvas.onmousemove = function(evt) {
			me.mousePosition = me.mousePosition(me.canvas, evt);
		}
		
		return this.mousePosition;
	}
	
	mousePosition(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}
}

export default Events;