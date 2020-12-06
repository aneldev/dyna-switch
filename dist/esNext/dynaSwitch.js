export var dynaSwitch = function (testValue, defaultValue, cases) {
    var result = cases[testValue];
    if (typeof result === "function")
        return result();
    if (typeof result === "undefined") {
        return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
    return result;
};
//# sourceMappingURL=dynaSwitch.js.map