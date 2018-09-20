const scriptUrls = [
    'js/EvanBrosCE/class/main.js',
    'js/EvanBrosCE/class/canvas.js',
    'js/EvanBrosCE/class/draw.js'
];

loadAllComponents(scriptUrls);

function loadAllComponents(scriptUrls) {
    var script, components = document.createDocumentFragment();
    for (var i = 0; i < scriptUrls.length; i++) {
        script = document.createElement('script');
        script.src = scriptUrls[i];
        components.appendChild(script);
    }
    document.body.appendChild(components);
}
