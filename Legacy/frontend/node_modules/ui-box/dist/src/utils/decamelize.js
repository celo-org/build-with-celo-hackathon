"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const separator = '-';
const regex1 = /([a-z\d])([A-Z])/g;
const regex2 = /([a-z]+)([A-Z][a-z\d]+)/g;
function decamelize(text) {
    return text
        .replace(regex1, `$1${separator}$2`)
        .replace(regex2, `$1${separator}$2`)
        .toLowerCase();
}
exports.default = decamelize;
