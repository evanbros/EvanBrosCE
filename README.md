# EvanBrosCE
A Javascript canvas engine based in HTML Canvas

# Documentation
## Installation
You may download or clone this repository and follow the instructions of the next section (Basic Set).

Soon, we will have the package for installation at **[npm](https://www.npmjs.com)**.
## Basic Set
Create an **HTML** and a **JavaScript** files.

Your **_index.html_** may look like this:
```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
    <script type="text/javascript" src="libs/EvanBrosCE/EvanBrosCE.js"></script>
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

## EvanBrosCE Main Methods
### init ([width], [height], [smooth], [style])
#### Parameters:
- width (number):
  - HTML width for the canvas element.
  - Default value: 400
- height (number):
  - HTML height for the canvas element.
  - Default value: 400
- smooth (bool):
  - The pixels of scaled images are smoothed if true value.
  - Default value: false
- style (string):
  - HTML style for the canvas element.
  - Default value: "background: black"
#### Example:
```javascript
  const ce = EvanBrosCE.init(800, 500, true, "border: black solid 4px; background: white");
```

### run (load, update, render)
#### Parameters:
- load (function)
- update (function)
- render (function)
#### Example:
```javascript
  ce.run(myLoadFunction, myUpdateFunction, myRenderFunction);
```

### calculateFPS ()
#### Parameters:
- Void
#### Example:
```javascript
  const fps = ce.calculateFPS();
```

## EvanBrosCE Load Methods
### loadImage (name, source)
#### Parameters:
- name (string):
	- The name that will be used to associate the image loaded.
- source (string):
	- The source of image file.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const load => () {
  ce.loadImage("image1", "imgs/image1.png");
}
```

### loadSound (name, source)
#### Parameters:
- name (string):
	- The name that will be used to associate the sound loaded.
- source (string):
	- The source of sound file.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const load => () {
  ce.loadSound("image1", "sounds/sound1.mp3");
}
```

## EvanBrosCE Draw Methods
### draw.path (coordinates, thickness, type)
#### Parameters:
- coordinates (object):
	- object { x (array of numbers) , y (array of numbers) }
- thickness (number):
	- The thickness size of the path.
- type (string):
	- Accept one of this two values: "fill" or "stroke".
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.path(
    {x: [10, 20, 30, 40, 90], y: [40, 20, 100, 30, 50]},
    10,
    "stroke"
  );
}
```

### draw.curve (coordinates, radius, type)
#### Parameters:
- coordinates (object):
	- object { x (array of **three** numbers) , y (array of **three** numbers) }
- radius (number):
	- The radius size of circle created by this three points.
- type (string):
	- Accept one of this two values: "fill" or "stroke".
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.curve(
    {x: [100, 150, 150], y: [20, 20, 70]},
    50,
    "stroke"
  );
}
```

### draw.rectangle (coordinates, type)
#### Parameters:
- coordinates (object):
	- object { x (number) , y (number), width (number), height (number) }
- type (string):
	- Accept one of this two values: "fill", "stroke" or \*"clear".
	- \*The "clear" type will create a rectangle to erase the area.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.rectangle(
    {x: 10, y: 10, width: 100, height: 200},
    "fill"
  );
}
```

### draw.arc (coordinates, radius, type, [angles], [anticlockwise])
#### Parameters:
- coordinates (object):
	- object { x (number) , y (number) }
- radius (number):
	- The radius size of arc created.
- type (string):
	- Accept one of this two values: "fill" or "stroke"
- angles (object):
  - object {init (number), end (number)}
  - Default values: {init: 0, end: 360}
- anticlockwise (bool):
	- Default value: false

#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.arc(
    {x: 150, y: 200},
    100,
    "stroke"
  );
}
```

### draw.text (text, coordinates, type, style)
#### Parameters:
- text (string):
  - Text that will be draw.
- coordinates (object):
	- object { x (number) , y (number) }
- type (string):
	- Accept one of this two values: "fill" or "stroke".
- style (string):
  - One string with number in pixels and the font-family of the text.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.text(
    "Example of text...",
    {x: 120, y: 120},
    "fill",
    "16px Times New Roman"
  );
}
```

### draw.image (image, coordinates)
#### Parameters:
- image (assets):
  - EvanBrosCE.assets['LOADED_IMAGE_NAME']
- coordinates (object):
	- object { x (number) , y (number), [width] (number), [height] (number), [mirror] (bool), [angle] (number) }
#### Example:
```javascript
const ce = EvanBrosCE.init();

const load => () {
  ce.loadImage("image1", "imgs/image1.png");
}

const render => () {
  ce.draw.image(
    ce.assets['image1'],
    {x: 50, y: 50, angle: -20, mirror: true}
  );
}
```

### draw.sprite (image, coordinates, sprite, frameLimit, timeToNextFrame)
#### Parameters:
- image (assets):
  - EvanBrosCE.assets['LOADED_SPRITE_NAME']
- coordinates (object):
	- object { x (number) , y (number), [width] (number), [height] (number), [mirror] (bool), [angle] (number) }
- sprite (object)
  - object { x (number), y (number), width (number), height (number) }
  - The position and size in sprite sheet of the sprites.
  - The width and height must respect the original pixels size of the image.
- frameLimit (number)
	- Number of frames on sprite sheet.
- timeToNextFrame (number)
  - Time in seconds to change the frames on sprite sheet.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const load => () {
  ce.loadImage("sprite1", "imgs/sprite1.png");
}

const render => () {
  ce.draw.sprite(
    ce.assets['sprite1'],
    {x: 10, y: 10},
    {x: 0, y: 0, width: 60, height: 60},
    4,
    0.5
  );
}
```

### draw.pattern (image, coordinates, patternSize, repetition)
#### Parameters:
- image (assets):
  - EvanBrosCE.assets['LOADED_SPRITE_NAME']
- coordinates (object):
	- object { x (number) , y (number), width (number), weight (number) }
  - Coordinates of the area that will receive the pattern.
- patternSize (object)
  - object { width (number), height (number) }
  - Size of pattern inside of area.
- repetition (string)
	- Accept one of this four values: "repeat", "no-repeat", "repeat-x" or "repeat-y".
#### Example:
```javascript
const ce = EvanBrosCE.init();

const load => () {
  ce.loadImage("pattern1", "imgs/pattern1.png");
}

const render => () {
  ce.draw.pattern(
    ce.assets["pattern1"],
    {x: 100, y: 40, width: 400, height: 400},
    {width: 50, height: 50},
    "repeat"
  );
}
```

## EvanBrosCE Draw Methods (Setters)
### draw.setColor (color)
#### Parameters:
- color (string)
  - Hexadecimal numbers or web colors.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.setColor('blue');

  ce.draw.rectangle(
    {x:100, y:50, width: 50, height: 50},
    "stroke"
  );
  
  ce.draw.setColor('#ff0000');

  ce.draw.rectangle(
    {x:200, y:100, width: 50, height: 50},
    "fill"
  );
}
```

### draw.setLinearGradient (coordinates, colors)
#### Parameters:
- coordinates (object)
  - object { x (number) , y (number), x2 (number), y2 (number) }
- colors (object)
  - object { \*color (number) }
  - Percentual number of the color in gradient.
  - \*Use hexadecimal numbers or web colors.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.setLinearGradient(
    {x: 400, y: 0, x2: 600, y2: 0}, 
    {"red": 0, "green": 20, "white": 40, "blue": 60, "#cc00dd": 80, "yellow": 100}
  );
  
  ce.draw.rectangle({x: 400, y: 150, width: 200, height: 200}, "fill");  
}
```

### draw.setRadialGradient (coordinates, colors)
#### Parameters:
- coordinates (object)
  - object { x (number) , y (number), x2 (number), y2 (number) }
- colors (object)
  - object { \*color (number) }
  - Percentual number of the color in gradient.
  - \*Use hexadecimal numbers or web colors.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.setRadialGradient(
    {x: 250, y: 250, initR: 25	, endR: 100}, 
    {'red': 0, 'green': 33, 'white': 66, 'blue': 100}
  );
  
  ce.draw.arc({x: 250, y: 250}, 100, 'fill');
}
```

### draw.setShadow (offsetCoordinates, blurLevel, color)
#### Parameters:
- offsetCoordinates (object)
  - object { x (number) , y (number) }
- blurLevel (number)
  - Level of the blur effect on shadow.
- color (string)
  - Hexadecimal numbers or web colors.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  game.draw.setShadow(
    {x: 10, y: 10},
    20,
    'red'
  );
  
  ce.draw.arc({x: 250, y: 250}, 100, 'fill');
}
```

### draw.unsetShadow ()
#### Parameters:
- Void
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  game.draw.setShadow(
    {x: 10, y: 10},
    20,
    'red'
  );
  
  ce.draw.arc({x: 250, y: 250}, 100, 'fill');
  
  game.draw.unsetShadow();

  game.draw.rectangle({x: 400, y: 150, width: 200, height: 200}, 'fill');
}
```
