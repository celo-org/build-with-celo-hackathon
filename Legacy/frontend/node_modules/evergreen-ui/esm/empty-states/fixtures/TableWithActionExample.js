import React from 'react';
import { SearchIcon } from '../../icons';
import { Pane } from '../../layers';
import { majorScale } from '../../scales';
import { Table } from '../../table';
import { useTheme } from '../../theme';
import EmptyState from '../src/EmptyState';

var TableWithActionExample = function TableWithActionExample() {
  var _useTheme = useTheme(),
      colors = _useTheme.colors;

  return /*#__PURE__*/React.createElement(Pane, {
    marginBottom: majorScale(8)
  }, /*#__PURE__*/React.createElement(Table, {
    maxWidth: 1152,
    width: "100%"
  }, /*#__PURE__*/React.createElement(Table.Head, null, /*#__PURE__*/React.createElement(Table.TextHeaderCell, null, "Name"), /*#__PURE__*/React.createElement(Table.TextHeaderCell, null, "Status"), /*#__PURE__*/React.createElement(Table.TextHeaderCell, null, "Created At ")), /*#__PURE__*/React.createElement(Table.Body, {
    height: "auto"
  }, /*#__PURE__*/React.createElement(EmptyState, {
    background: "light",
    title: "No audiences found",
    orientation: "horizontal",
    icon: /*#__PURE__*/React.createElement(SearchIcon, {
      color: colors.gray500
    }),
    iconBgColor: colors.gray200,
    description: "Click the button below to create a new Audience. Once done, you will see it come up in this list.",
    primaryCta: /*#__PURE__*/React.createElement(EmptyState.PrimaryButton, null, "Create Audience")
  }))));
};

TableWithActionExample.displayName = "TableWithActionExample";
export default TableWithActionExample;