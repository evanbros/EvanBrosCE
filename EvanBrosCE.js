import Draw from './class/draw.js';
import Sound from './class/sound.js';
import Events from './class/events.js';

class EvanBrosCE {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = document.getElementById(id).getContext("2d");
    this.startDate = new Date();
    this.lapseDate = new Date();
    this.assets = [];
    this.draw = new Draw(this.ctx, this.startDate, this.saveState, this.restoreState);
    this.sound = new Sound;
    this.events = new Events(this.canvas);
    this.fpsLimit = 120;
  }

  static init(id, component, width=400, height=400, scale=[1,1], smooth = false, style='background: black') {
    const canvas = {};
    const el = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style = style;
    
    el.setAttribute('id', id);
    el.setAttribute('style', canvas.style);
    el.setAttribute('width', canvas.width)
    el.setAttribute('height', canvas.height)
    
    document.getElementById(component).append(el);

    var evanbros = new this(id);
    evanbros.ctx.imageSmoothingEnabled = smooth;
    evanbros.ctx.scale(scale[0], scale[1]);
    return evanbros;
  }

  run(load, update, render){
    var me = this;
    var preload = new Promise(function(resolve,reject){
      load();
      resolve();
    });
    preload.then(
      function repeat(){
        if(me.calculateFrames() < me.fpsLimit) {
          me.lapseDate = new Date();
          me.cleanCanvas(me.ctx.canvas.width, me.ctx.canvas.height)
          update();
          render();
        } 
        me.animation = requestAnimationFrame(repeat);
      }
    );
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
    var oldDate = this.dateFPS;
    this.dateFPS = new Date();
    var interval = (oldDate - this.dateFPS)/1000;
    return Math.round(1/interval*-1);
  }
  
  calculateFrames() {
    this.dateFrames = new Date();
    var interval = (this.lapseDate - this.dateFrames)/1000;
    return Math.round(1/interval*-1);
  }

  createTilemap(name, matrix, size, tiles, margin = 0) {
    var tileReturn = [];

    for(var i = 0; i < matrix[0].length; i++) {
      for(var j = 0; j < matrix.length; j++) {
        tileReturn[j+'-'+i] = {
          type: matrix[j][i],
          row: j, 
          col: i, 
          position: {
            xI: size.width*(i),
            xF: size.width*(i+1)-1,
            yI: size.height*(j),
            yF: size.height*(j+1)-1
          }
        };
      }
    }

    var tilemap = [];
    for(var i = 1; i <= tiles.rows; i++) {
      for(var j = 1; j <= tiles.columns; j++) {
        tilemap.push({
          x: (size.width * (j-1)) + (margin * j),
          y: (size.height * (i-1)) + (margin * i),
          width: size.width,
          height: size.height
        }); 
      }
    }
    
    this.assets[name] = [tilemap, matrix];

    return tileReturn;
  }
}

export default EvanBrosCE;