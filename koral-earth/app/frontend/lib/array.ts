export const rowsFromData = <T>(data: T[], itemsPerRow: number = 4): T[][] => {
  const dataGroupedInRows: T[][] = [];

  const ungroupedLastRow = data.reduce((prev: T[], curr: T, index) => {
    if (index === 0) {
      return [curr];
    }

    if (index % itemsPerRow === 0) {
      dataGroupedInRows.push(prev);
      return [curr];
    }

    return [...prev, curr];
  }, []);

  dataGroupedInRows.push(ungroupedLastRow);

  return dataGroupedInRows;
};
