# EvanBrosCE
A Javascript canvas engine based in HTML Canvas

# Documentation
## Installation

## Basic Set
Create an **HTML** and a **JavaScript** files.

Your **_index.html_** may look like this:
```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
    <script type="text/javascript" src="EvanBrosCE/EvanBrosCE.js"></script>
    <script type="text/javascript" src="example.js"></script>
  </head>
  <body>
  </body>
</html>
```

And the **_example.js_** should look like this:
```javascript
window.onload = () => {
  const ce = EvanBrosCE.init();

  const load => () {
  }

  const update => () {
  }

  const render => () {
  }

  ce.run(load, update, render);
}
```

>\*It is important that your JS file run inside of a **window.onload** event, this will make sure that all the stuff will load before you try to use it.

The **load** function should receive all the information that will be preloaded, simple data, objects, arrays, images or anything else that you want to use later.

The **update** function will be used to perform the update layer of the data that will be used on the canvas.

Finally you can use the function **render** to draw on the canvas.

## EvanBrosCE Load Methods
### loadImage (name, source)
#### Parameters:
- name:
	- The name that will be used to associate the image loaded.
- source:
	- The source of image file.
#### Example:
```javascript
	const ce = EvanBrosCE.init();
	
	const load => () {
		ce.loadImage('image1', 'imgs/image1.png');
	}
```