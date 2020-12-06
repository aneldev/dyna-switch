"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynaSwitchIf = void 0;
var dynaSwitchIf = function (testValue, defaultValue, cases) {
    for (var index = 0; index < cases.length; index++) {
        var scanCase = cases[index];
        var ifValue = typeof scanCase.if === 'function' ? scanCase.if() : scanCase.if;
        if (testValue === ifValue) {
            return typeof scanCase.then === "function" ? scanCase.then() : scanCase.then;
        }
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
};
exports.dynaSwitchIf = dynaSwitchIf;
//# sourceMappingURL=dynaSwitchIf.js.map