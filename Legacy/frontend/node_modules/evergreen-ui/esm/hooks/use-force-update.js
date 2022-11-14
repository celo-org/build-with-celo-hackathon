import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useState, useCallback } from 'react';
export function useForceUpdate() {
  // eslint-disable-next-line no-unused-vars
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      _ = _useState2[0],
      setValue = _useState2[1];

  return useCallback(function () {
    return setValue({});
  }, [setValue]);
}