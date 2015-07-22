## AngularJS autocomplete directive

This project contains the autocomplete directive and template for AngularJS projects.
In order to use an input autocomplete with angularJS, I implemented a directive that contains the URL and other parameters in order to be easy to use.
Because of popularity the code and template are adopted to the bootstrap framework & fontawesome which can be downloaded from here.

* Bootstrap: http://getbootstrap.com
* FontAwesome: http://fortawesome.github.io/Font-Awesome/

## Usage

You can simply insert the autocomplete directive tag anywhere in your html.
The directive takes 2 parameters.

* id: object id
* url: request url

```html
<autocomplete id="navsearch" url="autocomplete">
	<div class="input-group">
		<span class="input-group-addon"><i class="fa fa-search"></i></span>
  		<input type="text" class="form-control" placeholder="Type something">
  	</div>
</autocomplete>  
```

## Installation

You will need to have a working Angular installation setup.
Simply include the autocomplete.js.

```html
<script src="path/to/your/autocomplete.js"></script>
```

Then include the autocomplete module.

```javascript
var app = angular.module('yourApp', ['input-autocomplete']);
```
