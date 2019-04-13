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
  ce.loadImage("image1", "imgs/image1.png");
}
```
### loadSound (name, source)
#### Parameters:
- name:
	- The name that will be used to associate the sound loaded.
- source:
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
	- Accept one of this two values: "fill" or "stroke"
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.path(
    {x: [10, 20, 30, 40, 90], y: [40, 20, 100, 30, 50]},
    10,
    "stroke"
  )
}
```
### draw.curve (coordinates, radius, type)
#### Parameters:
- coordinates (object):
	- object { x (array of **three** numbers) , y (array of **three** numbers) }
- radius (number):
	- The radius size of circle created by this three points.
- type (string):
	- Accept one of this two values: "fill" or "stroke"
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.curve(
    {x: [100, 150, 150], y: [20, 20, 70]},
    50,
    "stroke"
  )
}
```

### draw.rectangle (coordinates, type)
#### Parameters:
- coordinates (object):
	- object { x (number) , y (number), width (number), height (number) }
- type (string):
	- Accept one of this two values: "fill", "stroke" or \*"clear"
	- \*The "clear" type will create a rectangle to erase the area.
#### Example:
```javascript
const ce = EvanBrosCE.init();

const render => () {
  ce.draw.rectangle(
    {x: 10, y: 10, width: 100, height: 200},
    "fill"
  )
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
  )
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
  )
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
  )
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
  - The position and size in sprite sheet of the sprites
  - The width and height must respect the original pixels size of the image
- frameLimit (number)
	- Number of frames on sprite sheet
- timeToNextFrame (number)
  - Time in seconds to change the frames on sprite sheet
#### Example:
```javascript
const ce = EvanBrosCE.init();

const load => () {
  ce.loadImage("sprite1", "imgs/sprite1.png");
}

const render => () {
  game.draw.sprite(
    game.assets['sprite1'],
    {x: 10, y: 10},
    {x: 0, y: 0, width: 60, height: 60},
    4,
    0.5
  )
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
  - Size of pattern inside of area
- repetition (string)
	- Accept one of this four values: "repeat", "no-repeat", "repeat-x" or "repeat-y"
#### Example:
```javascript
const ce = EvanBrosCE.init();

const load => () {
  ce.loadImage("pattern1", "imgs/pattern1.png");
}

const render => () {
  game.draw.pattern(
    game.assets["pattern1"],
    {x: 100, y: 40, width: 400, height: 400},
    {width: 50, height: 50},
    "repeat"
  )
}
```
