import _extends from "@babel/runtime/helpers/esm/extends";
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '../../buttons';
import { CrossIcon } from '../../icons';
import { Pane } from '../../layers';
import { Text } from '../../typography';
import OptionShapePropType from './OptionShapePropType';
import OptionsList from './OptionsList';

var DefaultTitleView = function DefaultTitleView(_ref) {
  var close = _ref.close,
      headerHeight = _ref.headerHeight,
      title = _ref.title;
  return /*#__PURE__*/React.createElement(Pane, {
    display: "flex",
    alignItems: "center",
    borderBottom: "default",
    padding: 8,
    height: headerHeight,
    boxSizing: "border-box"
  }, /*#__PURE__*/React.createElement(Pane, {
    flex: "1",
    display: "flex",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Text, {
    size: 300,
    textTransform: "uppercase"
  }, title)), /*#__PURE__*/React.createElement(IconButton, {
    icon: CrossIcon,
    appearance: "minimal",
    height: 24,
    onClick: close,
    border: "none"
  }));
};

DefaultTitleView.displayName = "DefaultTitleView";
DefaultTitleView.propTypes = {
  close: PropTypes.func,
  title: PropTypes.string,
  headerHeight: PropTypes.number
};
var emptyArray = [];
var SelectMenuContent = /*#__PURE__*/memo(function SelectMenuContent(props) {
  var title = props.title,
      width = props.width,
      height = props.height,
      _props$options = props.options,
      options = _props$options === void 0 ? emptyArray : _props$options,
      _props$hasTitle = props.hasTitle,
      hasTitle = _props$hasTitle === void 0 ? true : _props$hasTitle,
      _props$hasFilter = props.hasFilter,
      hasFilter = _props$hasFilter === void 0 ? true : _props$hasFilter,
      filterPlaceholder = props.filterPlaceholder,
      filterIcon = props.filterIcon,
      close = props.close,
      listProps = props.listProps,
      _props$titleView = props.titleView,
      titleView = _props$titleView === void 0 ? DefaultTitleView : _props$titleView,
      detailView = props.detailView,
      emptyView = props.emptyView,
      isMultiSelect = props.isMultiSelect,
      closeOnSelect = props.closeOnSelect;
  var headerHeight = 40;
  var optionsListHeight = hasTitle ? height - headerHeight : height;
  var hasDetailView = Boolean(detailView);
  var hasEmptyView = Boolean(emptyView);
  return /*#__PURE__*/React.createElement(Pane, {
    display: "flex",
    height: height
  }, /*#__PURE__*/React.createElement(Pane, {
    width: width,
    height: height,
    display: "flex",
    flexDirection: "column",
    borderRight: hasDetailView ? 'muted' : null
  }, hasTitle && titleView({
    close: close,
    title: title,
    headerHeight: headerHeight
  }), options.length === 0 && hasEmptyView ? /*#__PURE__*/React.createElement(Pane, {
    height: optionsListHeight
  }, emptyView) : /*#__PURE__*/React.createElement(OptionsList, _extends({
    height: optionsListHeight,
    hasFilter: hasFilter,
    filterPlaceholder: filterPlaceholder,
    filterIcon: filterIcon,
    options: options,
    isMultiSelect: isMultiSelect,
    close: close,
    closeOnSelect: closeOnSelect
  }, listProps))), hasDetailView && detailView);
});
SelectMenuContent.propTypes = {
  close: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  headerHeight: PropTypes.number,
  options: PropTypes.arrayOf(OptionShapePropType),
  hasTitle: PropTypes.bool,
  hasFilter: PropTypes.bool,
  filterPlaceholder: PropTypes.string,
  filterIcon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element]),
  listProps: PropTypes.shape(OptionsList.propTypes),

  /**
   * When true, multi select is accounted for.
   */
  isMultiSelect: PropTypes.bool,

  /*
   * When true, menu closes on option selection.
   */
  closeOnSelect: PropTypes.bool,

  /**
   * Node that is placed in the header section, above the options.
   */
  titleView: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

  /**
   * Node that is placed right next to the options.
   */
  detailView: PropTypes.node,

  /**
   * Node that is displayed instead of options list when there are no options.
   */
  emptyView: PropTypes.node
};
export default SelectMenuContent;