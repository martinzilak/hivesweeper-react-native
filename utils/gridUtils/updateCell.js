export const updateCell = (grid, cell) => ({
    ...grid,
    [cell.id]: cell,
});
