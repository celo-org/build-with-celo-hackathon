import _typeof from "@babel/runtime/helpers/esm/typeof";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import merge from 'lodash.merge';
export function get(obj, path, fallback) {
  var keys = path && path.split ? path.split('.') : [path];
  var value = obj;

  var _iterator = _createForOfIteratorHelper(keys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      value = value ? value[key] : undefined;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return value === undefined ? fallback : value;
}
/**
 * Gets a value from the given theme based on a path when present,
 * else returns the provided value
 * @param {object} theme
 * @param {unknown} pathOrValue
 */

export function getValue(theme, pathOrValue) {
  return get(theme, pathOrValue, pathOrValue);
}
/**
 * Adds or overrides theme values on top of an existing theme object
 * @param destinationTheme Theme object to merge on top of
 * @param sourceTheme Theme object that adds or overrides values
 */

export function mergeTheme(destinationTheme, sourceTheme) {
  return merge({}, destinationTheme, sourceTheme);
}
/**
 * Resolves an object (or style config) when referencing theme paths
 * It will preserve the original object structure (nesting)
 * @param {object} theme
 * @param {object} obj
 * @returns {object} a new object with theme-resolved properties
 */

export function resolveThemeTokens(theme, obj) {
  var result = {};

  for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var raw = obj[key];

    if (raw === null) {
      continue;
    }

    if (_typeof(raw) === 'object') {
      result[key] = resolveThemeTokens(theme, raw);
    } else {
      result[key] = getValue(theme, raw);
    }
  }

  return result;
}