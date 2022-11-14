import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import ReactDOM from 'react-dom';
import canUseDom from '../../lib/canUseDom';
import getMajorVersion from '../../lib/getMajorVersion';
import ToastManager from './ToastManager';
/**
 * The Toaster manages the interactions between
 * the ToasterManger and the toast API.
 */

var Toaster = function Toaster() {
  var _this = this;

  _classCallCheck(this, Toaster);

  _defineProperty(this, "_bindNotify", function (handler) {
    _this.notifyHandler = handler;
  });

  _defineProperty(this, "_bindRemove", function (handler) {
    _this.removeHandler = handler;
  });

  _defineProperty(this, "_bindGetToasts", function (handler) {
    _this.getToastsHandler = handler;
  });

  _defineProperty(this, "_bindCloseAll", function (handler) {
    _this.closeAllHandler = handler;
  });

  _defineProperty(this, "getToasts", function () {
    return _this.getToastsHandler();
  });

  _defineProperty(this, "closeAll", function () {
    return _this.closeAllHandler();
  });

  _defineProperty(this, "notify", function (title) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.notifyHandler(title, _objectSpread(_objectSpread({}, settings), {}, {
      intent: 'none'
    }));
  });

  _defineProperty(this, "success", function (title) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.notifyHandler(title, _objectSpread(_objectSpread({}, settings), {}, {
      intent: 'success'
    }));
  });

  _defineProperty(this, "warning", function (title) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.notifyHandler(title, _objectSpread(_objectSpread({}, settings), {}, {
      intent: 'warning'
    }));
  });

  _defineProperty(this, "danger", function (title) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.notifyHandler(title, _objectSpread(_objectSpread({}, settings), {}, {
      intent: 'danger'
    }));
  });

  _defineProperty(this, "remove", function (id) {
    return _this.removeHandler(id);
  });

  if (!canUseDom) return;
  var container = document.createElement('div');
  container.setAttribute('data-evergreen-toaster-container', '');
  document.body.appendChild(container);

  var toastManager = function toastManager() {
    return /*#__PURE__*/React.createElement(ToastManager, {
      bindNotify: _this._bindNotify,
      bindRemove: _this._bindRemove,
      bindGetToasts: _this._bindGetToasts,
      bindCloseAll: _this._bindCloseAll
    });
  };

  if (getMajorVersion(ReactDOM.version) >= 18) {
    try {
      var _require = require('react-dom/client'),
          createRoot = _require.createRoot;

      var root = createRoot(container);
      root.render(toastManager());
    } catch (e) {
      ReactDOM.render(toastManager(), container);
    }

    return;
  }

  ReactDOM.render(toastManager(), container);
};

export { Toaster as default };