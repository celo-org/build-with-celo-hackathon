"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex_1 = require("./utils/regex");
const dashRegex = /[ .]/g;
const percentRegex = /%/g;
function getSafeValue(value) {
    return value
        .replace(dashRegex, '-')
        .replace(percentRegex, 'prcnt')
        .replace(regex_1.unsafeClassNameCharacters, '');
}
exports.default = getSafeValue;
