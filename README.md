# EvanBrosCE
A Javascript canvas engine based in HTML Canvas

## Documentation
Working on it!

Your **_index.html_** may look like this:
```
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
```
window.onload = () => {
		const ce = EvanBrosCE.init(800, 500);
		
        const load => () {
			
		}
		
		const update => () {
			
		}
		
		const render => () {
			
		}
		
        ce.run(load, update, render);
```

It is important that your JS file run inside of a **window.onload** event, this will make sure that all the stuff will load before you try to use it.