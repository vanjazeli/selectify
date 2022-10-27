class Selectify {
    constructor(selectorClass, propertiesObject) {
        this.selectorClass = selectorClass;
        this.propertiesObject = propertiesObject;
        this.selectObjects = this.gettingSelectObjects();
        this.mockupObjects = [];
    }

    init() {
        this.mockupPlacement();
        this.eventHandling();
        if (this.propertiesObject.disableBelow) this.disableBelow();
    }

    gettingSelectObjects() {
        let selectObjects = [];
        const selectItems = document.querySelectorAll("." + this.selectorClass);
        selectItems.forEach((selectItem) => {
            selectObjects = [
                ...selectObjects,
                {
                    select: selectItem,
                    options: [...selectItem.children],
                },
            ];
        });
        return selectObjects;
    }

    mockupPlacement() {
        this.selectObjects.forEach((selectObject, selectObjectIndex) => {
            const mockup = document.createElement("div");
            if (this.propertiesObject.styleClass) {
                mockup.classList.add(this.propertiesObject.styleClass);
            } else if (this.propertiesObject.bemClass) {
                mockup.classList.add(this.propertiesObject.bemClass);
            }
            mockup.classList.add("selectify");

            const button = document.createElement("button");
            if (this.propertiesObject.styleClass) {
                button.classList.add(
                    this.propertiesObject.styleClass + "-select"
                );
            } else if (this.propertiesObject.bemClass) {
                button.classList.add(
                    this.propertiesObject.bemClass + "__select"
                );
            }
            button.classList.add("selectify-select", this.selectorClass);

            if (selectObject.options.length > 0) {
                button.textContent = selectObject.options[0].textContent;
            } else {
                console.error(
                    `Missing <option> elements inside of a <select class='${this.selectorClass}'> element.`
                );
            }
            mockup.appendChild(button);

            if (selectObject.options) {
                const options = document.createElement("div");
                if (this.propertiesObject.styleClass) {
                    options.classList.add(
                        this.propertiesObject.styleClass + "-options"
                    );
                } else if (this.propertiesObject.bemClass) {
                    options.classList.add(
                        this.propertiesObject.bemClass + "__options"
                    );
                }
                if (this.propertiesObject.animation) {
                    options.style.maxHeight = "0px";
                    options.style.transition = `ease-in-out max-height 0.${this.propertiesObject.animation.animationTime}s`;
                }
                options.style.display = "none";
                options.classList.add("selectify-options");

                selectObject.options.forEach((option, optionIndex) => {
                    const textContent = option.textContent;
                    const optionButton = document.createElement("button");
                    if (this.propertiesObject.styleClass) {
                        optionButton.classList.add(
                            this.propertiesObject.styleClass + "-option"
                        );
                    } else if (this.propertiesObject.bemClass) {
                        optionButton.classList.add(
                            this.propertiesObject.bemClass + "__option"
                        );
                    }
                    optionButton.classList.add("selectify-option");
                    if (optionIndex === 0) {
                        optionButton.setAttribute("data-selected", "true");
                    } else {
                        optionButton.setAttribute("data-selected", "false");
                    }
                    optionButton.setAttribute("data-index", optionIndex);
                    optionButton.setAttribute("type", "button");
                    optionButton.textContent = textContent;
                    options.appendChild(optionButton);
                });

                this.mockupObjects[selectObjectIndex] = {
                    select: button,
                    options: [...options.children],
                    optionsWrap: options,
                    open: false,
                    whole: mockup,
                };

                mockup.appendChild(options);
            }
            selectObject.select.style.display = "none";
            selectObject.select.before(mockup);
        });
    }

    eventHandling() {
        this.mockupObjects.forEach((mockupObject, mockupObjectIndex) => {
            mockupObject.select.addEventListener("click", () => {
                if (!this.propertiesObject.animation) {
                    if (!mockupObject.open) {
                        this.openMockupAction(mockupObject);
                    } else {
                        this.closeMockupAction(mockupObject);
                    }
                } else {
                    if (!mockupObject.open) {
                        this.openMockupAnimationAction(mockupObject);
                    } else {
                        this.closeMockupAnimationAction(mockupObject);
                    }
                }
            });

            mockupObject.options.forEach((option) => {
                option.addEventListener("click", () => {
                    const dataIndex = option.getAttribute("data-index");
                    const textContent = option.textContent;
                    this.selectObjects[mockupObjectIndex].select.selectedIndex =
                        parseInt(dataIndex);
                    this.mockupObjects[mockupObjectIndex].select.textContent =
                        textContent;
                    if (!this.propertiesObject.animation) {
                        this.closeMockupAction(mockupObject);
                    } else {
                        this.closeMockupAnimationAction(mockupObject);
                    }
                });
            });

            if (this.propertiesObject.closeOnMouseLeave) {
                mockupObject.whole.addEventListener("mouseleave", () => {
                    if (mockupObject.open) {
                        if (!this.propertiesObject.animation) {
                            this.closeMockupAction(mockupObject);
                        } else {
                            this.closeMockupAnimationAction(mockupObject);
                        }
                    }
                });
            }
        });

        document.addEventListener("click", (e) => {
            const target = e.target;
            this.mockupObjects.forEach((mockupObject) => {
                if (mockupObject.open && target != mockupObject.select) {
                    if (!this.propertiesObject.animation) {
                        this.closeMockupAction(mockupObject);
                    } else {
                        this.closeMockupAnimationAction(mockupObject);
                    }
                }
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.mockupObjects.forEach((mockupObject) => {
                    if (mockupObject.open) {
                        if (!this.propertiesObject.animation) {
                            this.closeMockupAction(mockupObject);
                        } else {
                            this.closeMockupAnimationAction(mockupObject);
                        }
                    }
                });
            }
        });
    }

    openMockupAction(mockupObject) {
        if (this.propertiesObject.styleClass) {
            mockupObject.whole.classList.add(
                this.propertiesObject.styleClass + "-active"
            );
        } else if (this.propertiesObject.bemClass) {
            mockupObject.whole.classList.add(
                this.propertiesObject.bemClass + "--active"
            );
        }
        mockupObject.whole.classList.add("selectify-active");
        mockupObject.optionsWrap.removeAttribute("style");
        mockupObject.open = !mockupObject.open;
    }

    closeMockupAction(mockupObject) {
        if (this.propertiesObject.styleClass) {
            mockupObject.whole.classList.remove(
                this.propertiesObject.styleClass + "-active"
            );
        } else if (this.propertiesObject.bemClass) {
            mockupObject.whole.classList.remove(
                this.propertiesObject.bemClass + "--active"
            );
        }
        mockupObject.whole.classList.remove("selectify-active");
        mockupObject.optionsWrap.style.display = "none";
        mockupObject.open = !mockupObject.open;
    }

    openMockupAnimationAction(mockupObject) {
        if (this.propertiesObject.styleClass) {
            mockupObject.whole.classList.add(
                this.propertiesObject.styleClass + "-active"
            );
        } else if (this.propertiesObject.bemClass) {
            mockupObject.whole.classList.add(
                this.propertiesObject.bemClass + "--active"
            );
        }
        mockupObject.whole.classList.add("selectify-active");
        mockupObject.optionsWrap.style.display = "";
        setTimeout(() => {
            mockupObject.optionsWrap.style.maxHeight = `${this.propertiesObject.animation.maxHeight}px`;
        }, 1);
        mockupObject.open = !mockupObject.open;
    }

    closeMockupAnimationAction(mockupObject) {
        if (this.propertiesObject.styleClass) {
            mockupObject.whole.classList.add(
                this.propertiesObject.styleClass + "-active"
            );
        } else if (this.propertiesObject.bemClass) {
            mockupObject.whole.classList.add(
                this.propertiesObject.bemClass + "--active"
            );
        }
        mockupObject.whole.classList.add("selectify-active");
        mockupObject.optionsWrap.style.maxHeight = "0";
        setTimeout(() => {
            mockupObject.optionsWrap.style.display = "none";
        }, this.propertiesObject.animation.animationTime);
        mockupObject.open = !mockupObject.open;
    }

    disableBelow() {
        let debounceFunction;
        const mediaResult = window.matchMedia(
            `(max-width: ${this.propertiesObject.disableBelow}px)`
        );

        window.addEventListener("resize", () => {
            if (debounceFunction) {
                clearTimeout(debounceFunction);
            }

            if (mediaResult.matches) {
                debounceFunction = setTimeout(() => {
                    this.selectObjects.forEach(
                        (selectObject, selectObjectIndex) => {
                            this.disableSelectifyAction(
                                selectObject,
                                selectObjectIndex
                            );
                        }
                    );
                }, 750);
            } else {
                debounceFunction = setTimeout(() => {
                    this.selectObjects.forEach(
                        (selectObject, selectObjectIndex) => {
                            this.enableSelectifyAction(
                                selectObject,
                                selectObjectIndex
                            );
                        }
                    );
                }, 750);
            }
        });

        window.addEventListener("load", () => {
            if (mediaResult.matches) {
                this.selectObjects.forEach(
                    (selectObject, selectObjectIndex) => {
                        this.disableSelectifyAction(
                            selectObject,
                            selectObjectIndex
                        );
                    }
                );
            } else {
                this.selectObjects.forEach(
                    (selectObject, selectObjectIndex) => {
                        this.enableSelectifyAction(
                            selectObject,
                            selectObjectIndex
                        );
                    }
                );
            }
        });
    }

    enableSelectifyAction(selectObject, selectObjectIndex) {
        selectObject.select.style.display = "none";
        this.mockupObjects[selectObjectIndex].whole.removeAttribute("style");
    }

    disableSelectifyAction(selectObject, selectObjectIndex) {
        selectObject.select.removeAttribute("style");
        this.mockupObjects[selectObjectIndex].whole.style.display = "none";
    }
}

export default Selectify;
