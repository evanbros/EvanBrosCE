class Draw {
  constructor(ctx, startDate, save, restore) {
    this.ctx = ctx;
    this.color = 'white';
    this.fps;
    this.startDate = startDate;
    this.saveState = save;
    this.restoreState = restore;
  }
  calculateFPS() {
    var oldDate = this.date;
        this.date = new Date();
    var interval = (oldDate - this.date)/1000;
    this.fps = Math.round(1/interval*-1);
  }
  setColor(color) {
    this.color = color;
  }
  pattern(src, coordinates, patternSize, repetition) {
    var patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize.width;
    patternCanvas.height = patternSize.height;
    
    var patternCtx = patternCanvas.getContext('2d');
    patternCtx.imageSmoothingEnabled = false;
    patternCtx.drawImage(src, 0, 0, patternSize.width, patternSize.height);
    this.ctx.fillStyle = this.ctx.createPattern(patternCanvas, repetition);
    this.ctx.translate(coordinates.x, coordinates.y);
    this.ctx.fillRect(0, 0, coordinates.width, coordinates.height);
    this.ctx.translate(-coordinates.x, -coordinates.y);
  }
  setLinearGradient(coordinates, percentsAndColors) {
    this.color = this.ctx.createLinearGradient(coordinates[0][0], coordinates[0][1], coordinates[1][0], coordinates[1][1]);
    for(var i = 0; i < percentsAndColors.length; i++) {
      this.color.addColorStop(percentsAndColors[i][0]/100, percentsAndColors[i][1]);
    }
  }
  setRadialGradient(coordinates, percentsAndColors) {
    this.color = this.ctx.createRadialGradient(coordinates[0], coordinates[1], coordinates[2], coordinates[0], coordinates[1], coordinates[3]);
    for(var i = 0; i < percentsAndColors.length; i++) {
      this.color.addColorStop(percentsAndColors[i][0]/100, percentsAndColors[i][1]);
    }
  }
  setShadow(coordinates, blur, color) {
    this.ctx.shadowOffsetX = coordinates.x;
    this.ctx.shadowOffsetY = coordinates.y;
    this.ctx.shadowBlur = blur;
    this.ctx.shadowColor = color;
  }
  unsetShadow(){
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
  }
  path(coordinates, thickness, type) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = thickness;
    this.ctx.moveTo(coordinates.x[0], coordinates.y[0]);
    for (var i = 1; i < coordinates.x.length; i++) {
      this.ctx.lineTo(coordinates.x[i], coordinates.y[i]);
    }
    if(type === "fill") {
      this.ctx.fill();
    } else if (type === "stroke") {
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }
  arc(coordinates, radius, type, angles = {init:0,end:360}, anticlockwise = false) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.arc(coordinates.x, coordinates.y, radius, angles.init/180*Math.PI, angles.end/180*Math.PI, anticlockwise);
    if(type === "fill") {
      this.ctx.fill();
    } else if (type === "stroke") {
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }
  curve(coordinates, radius, type) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.moveTo(coordinates.x[0], coordinates.y[0]);
    this.ctx.arcTo(coordinates.x[1], coordinates.y[1], coordinates.x[2], coordinates.y[2], radius);
    if(type === "fill") {
      this.ctx.fill();
    } else if (type === "stroke") {
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }
  rectangle(coordinates, type) {
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    if(type === "fill") {
      this.ctx.fillRect(coordinates.x, coordinates.y, coordinates.width, coordinates.height);
    } else if (type === "stroke") {
      this.ctx.strokeRect(coordinates.x, coordinates.y, coordinates.width, coordinates.height);
    } else if (type === "clear"){
      this.ctx.clearRect(coordinates.x, coordinates.y, coordinates.width, coordinates.height);
    }
  }
  text(text, coordinates, type, style) {
    this.ctx.font = style
    if (type === 'fill') {
      this.ctx.fillStyle = this.color;
      this.ctx.fillText(text, coordinates.x, coordinates.y);
    } else if (type === 'stroke') {
      this.ctx.strokeStyle = this.color;
      this.ctx.strokeText(text, coordinates.x, coordinates.y);
    }
  }
  image(img, coordinates) {
    var width = coordinates.width || img.width,
        height = coordinates.height || img.height;
    this.saveState();
    this.translateScreen(coordinates.x+width/2, coordinates.y+height/2);
    if(coordinates.mirror) {
      this.ctx.scale(-1, 1);
    }
    this.rotateScreen(coordinates.angle);
    this.translateScreen(-(coordinates.x+width/2), -(coordinates.y+height/2));
    this.ctx.drawImage(img, coordinates.x, coordinates.y, width, height);
    this.restoreState();
  }
  sprite(img, coordinates, sprite, frameLimit, timeToNextFrame) {
    var nowDate = new Date(),
        timeCounter = Math.round((nowDate - this.startDate)/(1000*timeToNextFrame)),
        frame = (timeCounter % frameLimit);
    if(frame) {
        sprite.x += sprite.width*frame;
    }
    var width = coordinates.width || img.width,
        height = coordinates.height || img.height;

    this.saveState();
    this.translateScreen(coordinates.x+width/2, coordinates.y+height/2);
    if(coordinates.mirror) {
      this.ctx.scale(-1, 1);
    }
    this.rotateScreen(coordinates.angle);
    this.translateScreen(-(coordinates.x+width/2), -(coordinates.y+height/2));
    this.ctx.drawImage(img, sprite.x , sprite.y, sprite.width, sprite.height, coordinates.x, coordinates.y, coordinates.width, coordinates.height);
    this.restoreState();
  }
  translateScreen(x, y) {
    this.ctx.translate(x, y);
  }
  rotateScreen(angle) {
    this.ctx.rotate((Math.PI/180)*angle);
  }
}