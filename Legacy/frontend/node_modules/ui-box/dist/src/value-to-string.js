"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function valueToString(value, unit = 'px') {
    return typeof value === 'number' ? `${value}${unit}` : value;
}
exports.default = valueToString;
