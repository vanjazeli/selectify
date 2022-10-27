import Selectify from "./selectify.js";

const selectify = new Selectify("js-selectify", {
    bemClass: "style",
    animation: {
        maxHeight: 100,
        animationTime: 200,
    },
});

selectify.init();
