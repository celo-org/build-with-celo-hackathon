var shownWarnings = [];
export default (function (condition, warning) {
  if (condition && !shownWarnings.includes(warning)) {
    console.error("Warning: ".concat(warning));
    shownWarnings.push(warning);
  }
});