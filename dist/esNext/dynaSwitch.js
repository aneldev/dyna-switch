export var dynaSwitch = function (testValue, default_, cases) {
    var result = cases[testValue];
    if (typeof result === "function")
        return result();
    if (typeof result === "undefined")
        return default_;
    return result;
};
//# sourceMappingURL=dynaSwitch.js.map