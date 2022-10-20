import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export type PaginatedItemsComponent<T> = (props: {
  currentItems: T[];
}) => ReactNode;

type Props<T> = PropsWithChildren<{
  items: T[];
  itemsPerPage: number;
  itemsComponent: PaginatedItemsComponent<T>;
}>;

export const PaginatedLayout = <T,>({
  items,
  itemsPerPage,
  itemsComponent,
}: Props<T>) => {
  const [currentItems, setCurrentItems] = useState<T[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemOffset, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    window.scrollTo(0, 0);
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {itemsComponent({ currentItems })}

      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        nextLabel=">"
        previousLabel="<"
        breakLabel="."
        activeClassName="active"
        breakClassName="list-group-item"
        pageClassName="list-group-item"
        previousClassName="list-group-item"
        nextClassName="list-group-item"
        containerClassName="list-group list-group-horizontal-sm float-md-end mt-5 mb-5"
      />
    </>
  );
};
