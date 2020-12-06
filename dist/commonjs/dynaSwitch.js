"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynaSwitch = void 0;
var dynaSwitch = function (testValue, default_, cases) {
    var result = cases[testValue];
    if (typeof result === "function")
        return result();
    if (typeof result === "undefined")
        return default_;
    return result;
};
exports.dynaSwitch = dynaSwitch;
//# sourceMappingURL=dynaSwitch.js.map