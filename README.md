# Selectify
A small and simple JavaScript library which makes it possible to style &lt;option> elements by replacing their &lt;select> parent with a &lt;div> based mockup equivalent.

# Demo
Check out how selectify works right [here](https://vanjazeli.github.io/selectify/).

# Usage
Import the selectify JavaScript class to your main JavaScript file.
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
The ```javascript new Selectify('string', {object}) ``` constructor takes in two arguements. 
