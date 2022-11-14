import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useState } from 'react';
var count = 0;
/**
 * React hook that always returns an id value that is stable across re-renders
 * @param {string} prefix - a prefix to apply to id
 * @param {string} [explicitId] - an optional explicit value that takes precedence over the generated id
 * @returns {string}
 */

export function useId(prefix, explicitId) {
  var _useState = useState(function () {
    return explicitId || [prefix, ++count].filter(Boolean).join('-');
  }),
      _useState2 = _slicedToArray(_useState, 1),
      value = _useState2[0];

  return value;
}