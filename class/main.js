class EvanBrosCE {
  constructor() {
    this.ctx = document.getElementById('canvas_game').getContext("2d");
    this.startDate = new Date();
    this.draw = new Draw(this.ctx, this.startDate, this.saveState, this.restoreState);
    this.assets = [];
  }
  static init(x=400, y=400, smooth = false, style='background: black') {
    const canvas = new Canvas;
    const el = document.createElement('canvas');
    
    canvas.setSize(x, y);
    canvas.setStyle(style);
    
    el.setAttribute('id', 'canvas_game');
    el.setAttribute('style', canvas.style);
    el.setAttribute('width', canvas.width)
    el.setAttribute('height', canvas.height)
    
    document.body.append(el)
    var f = new this;
    f.ctx.imageSmoothingEnabled = smooth;
    return f;
  }
  run(load, update, render){
    var me = this;
    var preload = new Promise(function(resolve,reject){
      load()
      resolve();
    });
    preload.then(function repeat(){
      me.cleanCanvas(me.ctx.canvas.width, me.ctx.canvas.height)
      update();
      render();
      me.animation = requestAnimationFrame(repeat);
    });
  }
  cleanCanvas(width, height){
    this.ctx.clearRect(0, 0, width, height);
    this.draw.setColor('white');
    this.ctx.lineCap = 'butt';
    this.ctx.lineJoin = 'butt';
    this.ctx.lineWidth = 1;
  }
  loadImage(name, src) {
    var img = new Image();
    img.src = src;
    this.assets[name] = img;
  }
  saveState() {
    this.ctx.save();
  }
  restoreState() {
    this.ctx.restore();
  }
}