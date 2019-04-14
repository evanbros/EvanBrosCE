import Draw from './class/draw.js'
import Sound from './class/sound.js'

class EvanBrosCE {
  constructor() {
    this.ctx = document.getElementById('canvas_game').getContext("2d");
    this.startDate = new Date();
    this.assets = [];
    this.draw = new Draw(this.ctx, this.startDate, this.saveState(), this.restoreState());
    this.sound = new Sound;
  }

  static init(width=400, height=400, smooth = false, style='background: black') {
    const canvas = {};
    const el = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style = style;
    
    el.setAttribute('id', 'canvas_game');
    el.setAttribute('style', canvas.style);
    el.setAttribute('width', canvas.width)
    el.setAttribute('height', canvas.height)
    
    document.body.append(el);

    var evanbros = new this;
    evanbros.ctx.imageSmoothingEnabled = smooth;
    return evanbros;
  }

  run(load, update, render){
    var me = this;
    var preload = new Promise(function(resolve,reject){
      load();
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

  loadSound(name, src) {
    var sound = new Audio(src);
    this.assets[name] = sound;
  }

  saveState() {
    this.ctx.save();
  }

  restoreState() {
    this.ctx.restore();
  }
  
  calculateFPS() {
    var oldDate = this.date;
        this.date = new Date();
    var interval = (oldDate - this.date)/1000;
    return Math.round(1/interval*-1);
  }
}

export default EvanBrosCE;