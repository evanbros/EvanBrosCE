const scriptUrls = [
    'EvanBrosCE/class/main.js',
    'EvanBrosCE/class/draw.js'
];

loadAllComponents(scriptUrls);

function loadAllComponents(scriptUrls) {
    var script, components = document.createDocumentFragment();
    for (var i = 0; i < scriptUrls.length; i++) {
        script = document.createElement('script');
        script.src = scriptUrls[i];
        components.appendChild(script);
    }
    document.head.appendChild(components);
}

function initEvanBrosCE(x=400, y=400, smooth = false, style='background: black') {
    window.onload = function(){
        const canvas = {};
        const el = document.createElement('canvas');
        canvas.width = x;
        canvas.height = y;
        canvas.style = style;
        
        el.setAttribute('id', 'canvas_game');
        el.setAttribute('style', canvas.style);
        el.setAttribute('width', canvas.width)
        el.setAttribute('height', canvas.height)
        
        document.body.append(el)
        var evanbros = new EvanBrosCE;
        evanbros.ctx.imageSmoothingEnabled = smooth;
        return evanbros;
    }
  }
