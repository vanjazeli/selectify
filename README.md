# Selectify
A small and simple JavaScript library which makes it possible to style &lt;option> elements by replacing their &lt;select> parent with a &lt;div> based mockup equivalent.

# Demo
Check out how selectify works right [here](https://vanjazeli.github.io/selectify/).

# Usage
Import the selectify JavaScript class from selectify.js file to your main JavaScript file.
```javascript
import Selectify from "./selectify.js";

const selectify = new Selectify("js-selectify", {
    bemClass: "style",
    animation: {
        maxHeight: 100,
        animationTime: 200,
    },
});

selectify.init();
```

# Docs
The ```new Selectify(selector, propertiesObject)``` constructor takes in two arguements.

```selector``` is type of string and represents the targeted ```<select>``` element's class name. ```propertiesObject``` is type of object and it is used to modify the targeted ```<select>``` element to our needs by parsing multiple properties inside of it.

### ```propertiesObject``` properties

```styleClass``` defines a regular class name
