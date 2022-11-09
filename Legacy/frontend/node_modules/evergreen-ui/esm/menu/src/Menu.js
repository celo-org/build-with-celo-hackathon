import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Pane } from '../../layers';
import MenuDivider from './MenuDivider';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import MenuOption from './MenuOption';
import MenuOptionsGroup from './MenuOptionsGroup';
var Menu = /*#__PURE__*/memo(function Menu(props) {
  var menuRef = useRef(null);
  var firstItem = useRef();
  var lastItem = useRef();
  var menuItems = useRef();
  useEffect(function () {
    var currentMenuRef = menuRef.current;
    menuItems.current = _toConsumableArray(currentMenuRef.querySelectorAll('[role="menuitemradio"]:not([disabled]), [role="menuitem"]:not([disabled])'));
    firstItem.current = menuItems.current[0];
    lastItem.current = menuItems.current[menuItems.current.length - 1]; // Go to next/previous item if it exists
    // or loop around

    var focusNext = function focusNext(currentItem, startItem) {
      // Determine which item is the startItem (first or last)
      var goingDown = startItem === firstItem.current; // Helper function for getting next legitimate element

      var move = function move(elem) {
        var indexOfItem = menuItems.current.indexOf(elem);

        if (goingDown) {
          if (indexOfItem < menuItems.current.length - 1) {
            return menuItems.current[indexOfItem + 1];
          }

          return startItem;
        }

        if (indexOfItem - 1 > -1) {
          return menuItems.current[indexOfItem - 1];
        }

        return startItem;
      }; // Make first move


      var nextItem = move(currentItem); // Focus the first one that's not disabled

      nextItem.focus();
    };

    function onKeyPressListener(e) {
      var target = e.target;
      var menuItem = menuItems.current && menuItems.current.find(function (item) {
        return item === target;
      });
      if (!menuItem) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusNext(menuItem, firstItem.current);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusNext(menuItem, lastItem.current);
      }

      if (e.key === 'Home') {
        e.preventDefault();
        firstItem.current.focus();
      }

      if (e.key === 'End') {
        e.preventDefault();
        lastItem.current.focus();
      }
    }

    currentMenuRef.addEventListener('keydown', onKeyPressListener);
    return function () {
      currentMenuRef.removeEventListener('keydown', onKeyPressListener);
    };
  }, [menuRef]);
  var children = props.children;

  var renderEmptyChildren = function renderEmptyChildren() {
    return /*#__PURE__*/React.createElement(MenuGroup, null, /*#__PURE__*/React.createElement(MenuItem, {
      disabled: true
    }, "No items..."));
  };

  return /*#__PURE__*/React.createElement(Pane, {
    is: "nav",
    ref: menuRef,
    role: "menu",
    outline: "none"
  }, children || renderEmptyChildren());
});
Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
Menu.Group = MenuGroup;
Menu.Divider = MenuDivider;
Menu.Group = MenuGroup;
Menu.Option = MenuOption;
Menu.OptionsGroup = MenuOptionsGroup;
Menu.propTypes = {
  /**
   * The children of the component.
   */
  children: PropTypes.node
};
export default Menu;