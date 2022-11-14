import React from 'react';
import { Pagination, usePaginationBehavior } from '../';

var BasePaginationFixture = function BasePaginationFixture() {
  var _usePaginationBehavio = usePaginationBehavior({
    page: 1
  }),
      onNextPage = _usePaginationBehavio.onNextPage,
      onPageChange = _usePaginationBehavio.onPageChange,
      onPreviousPage = _usePaginationBehavio.onPreviousPage,
      page = _usePaginationBehavio.page;

  return /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    totalPages: 10,
    onNextPage: onNextPage,
    onPreviousPage: onPreviousPage,
    onPageChange: onPageChange
  });
};

BasePaginationFixture.displayName = "BasePaginationFixture";
export default BasePaginationFixture;