# EvanBrosCE
A Javascript canvas engine based in HTML Canvas

## Documentation
### Install

### First Steps

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

And the **_example.js_** may look like this:
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

Obs.: It is important that your JS file run inside of a **window.onload** event, this will make sure that all the stuff will load before you try to use it.