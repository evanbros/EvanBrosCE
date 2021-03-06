class Events {
	constructor(canvas) {
		this.canvas = canvas;
		this.mousePosition;
		this.keyPressed;
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

	configKeyboardKeys(keys) {
		document.addEventListener('keydown', handlerKeyDown, false);
		document.addEventListener('keyup', handlerKeyUp, false);
		
		let fired = false;		
		
		function handlerKeyDown(evt) {
			if(evt.keyCode in keys) {
				if(keys[evt.keyCode].press) {
					if(keys[evt.keyCode].pressOnlyOnce){
						if(!fired) {
							fired = true
							keys[evt.keyCode].press();
						} 
					} else {
						keys[evt.keyCode].press();
					}
				}
			}
		}

		function handlerKeyUp(evt) {
			if(evt.keyCode in keys) {
				fired = false;
				if(keys[evt.keyCode].release) {
					keys[evt.keyCode].release();
				}
			}
		}
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