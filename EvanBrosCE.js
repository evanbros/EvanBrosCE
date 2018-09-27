const basePath = (() => {
    const scripts = document.getElementsByTagName('script');
    const thisScript = scripts[scripts.length - 1];
    return thisScript.src.split('/').slice(0, -1).join('/');
})();

const scriptUrls = [
    `${ basePath }/class/main.js`,
    `${ basePath }/class/draw.js`,
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