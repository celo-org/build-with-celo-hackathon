/**
 * Function to help with focus management for selectable table cells.
 * @param {Object} key - React `event.key`.
 * @param {Element} ref - the cell to manage focus interaction for.
 */
export default function manageTableCellFocusInteraction(key, ref) {
  var tableRowChildren = Array.from(ref.parentElement.children);
  var columnIndex = tableRowChildren.indexOf(ref);
  var nextItemToFocus;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    if (key === 'ArrowLeft' && columnIndex - 1 >= 0) {
      nextItemToFocus = tableRowChildren[columnIndex - 1];
    } else if (key === 'ArrowRight' && columnIndex + 1 < tableRowChildren.length) {
      nextItemToFocus = tableRowChildren[columnIndex + 1];
    }
  } else if (key === 'ArrowUp' || key === 'ArrowDown') {
    var tableBodyChildren = Array.from(ref.parentElement.parentElement.children);
    var rowIndex = tableBodyChildren.indexOf(ref.parentElement);
    var nextRow;

    if (key === 'ArrowUp' && rowIndex - 1 >= 0) {
      nextRow = tableBodyChildren[rowIndex - 1];
    } else if (key === 'ArrowDown' && rowIndex + 1 < tableBodyChildren.length) {
      nextRow = tableBodyChildren[rowIndex + 1];
    }

    if (nextRow && nextRow.children) {
      nextItemToFocus = nextRow.children[columnIndex];
    }
  }

  if (nextItemToFocus && nextItemToFocus.hasAttribute('tabindex')) {
    nextItemToFocus.focus();
  }
}