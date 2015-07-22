This project contains the autocomplete directive and template for AngularJS projects.
In order to use an input autocomplete with angularJS, I implemented a directive that contains the URL and other parameters in order to be easy to use.

## Usage

You can insert the autocomplete directive tag and provide an id, url and optionally href object to it.
The directive takes 3 parameters.

* id: id of the object
* url: url to send the autocomplete request to

```html
<autocomplete id="navsearch" url="autocomplete">
	<div class="input-group">
		<span class="input-group-addon"><i class="fa fa-search"></i></span>
  		<input type="text" class="form-control" placeholder="Start searching with a course code or a teacher's name">
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
