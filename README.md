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

# How to use?
The ```new Selectify(selector, propertiesObject)``` constructor takes in two arguements.

```selector``` is type of string and represents the targeted ```<select>``` element's class name. ```propertiesObject``` is type of object and it is used to modify the targeted ```<select>``` element to our needs by parsing multiple properties inside of it.

#### ```styleClass``` type: string
Defines a class name that will be given to the mockup. All the elements inside of a mockup will be given a class name based on the ```styleClass```.

```javascript
import Selectify from "./selectify.js";

const selectify = new Selectify("js-selectify", {
    styleClass: "style",
});

selectify.init();
```

#### ```bemClass``` type: string
Defines a class name that will be given to the mockup. All the elements inside of a mockup will be given a BEM styled class name based on the ```bemClass```.

```javascript
import Selectify from "./selectify.js";

const selectify = new Selectify("js-selectify", {
    bemClass: "style",
});

selectify.init();
```

#### ```closeOnMouseLeave``` type: bool
Defines whether the mockup will automatically close on 'mouseleave'.

```javascript
import Selectify from "./selectify.js";

const selectify = new Selectify("js-selectify", {
    closeOnMouseLeave: true,
});

selectify.init();
```

#### ```disableBelow``` type: number
Defines the width of the window (in pixels) below which the selectify will stop taking effect.

```javascript
import Selectify from "./selectify.js";

const selectify = new Selectify("js-selectify", {
    disableBelow: 768,
});

selectify.init();
```

#### ```animation``` type: object
Defines the animation behaviour.

```javascript
import Selectify from "./selectify.js";

const selectify = new Selectify("js-selectify", {
    animation: {
        maxHeight: 100,
        animationTime: 200,
    },
});

selectify.init();
```
