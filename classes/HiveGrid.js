import * as R from 'ramda';

export class HiveGrid {
    constructor(grid) {
        this.grid = R.reduce((accumulatedGrid, cell) => ({
            ...accumulatedGrid,
            [cell.id]: cell,
        }), {})(grid);
        this.length = R.length(grid);
        this.hasCountBeenCalculated = false;
    }

    calculateNeighborCount() {
        if (this.hasCountBeenCalculated) {
            return;
        }

        R.forEach((cell) => {
            if (!cell.isBee) {
                return;
            }

            R.forEach((neighbor) => {
                neighbor.setNeighboringBees(neighbor.neighboringBees + 1);
            })(this.getNeighborsOfCellWithId(cell.id));
        })(this.getPrimitiveGrid());

        this.hasCountBeenCalculated = true;
    };

    getCellWithId(id) {
        return this.grid[id];
    };

    getCellsWithIds(ids) {
        return R.map((id) => this.getCellWithId(id))(ids);
    };

    filterCellsWithIdsByBeeStatus(ids, isBee = true) {
        return R.o(
            R.pluck('id'),
            R.filter(R.propEq('isBee', isBee)),
        )(this.getCellsWithIds(ids));
    };

    getCountOfCellsWithBeeStatus(isBee = true) {
        return R.o(
            R.length,
            R.filter(R.propEq('isBee', isBee)),
        )(this.getPrimitiveGrid());
    };

    getNeighborsOfCellWithId(id) {
        const neighborIds = this.getCellWithId(id).neighborIds;
        return R.map((neighborId) => this.getCellWithId(neighborId))(neighborIds);
    };

    getPrimitiveGrid() {
        return R.values(this.grid);
    };

    getAllIds() {
        return R.keys(this.grid);
    };

    updateCell(cell) {
        this.grid[cell.id] = cell;
        return this;
    };

    updateCells(cells) {
        R.forEach((cell) => this.updateCell(cell))(cells);
        return this;
    };

    changeBeeStatusForCellWithId(id, setIsBee = true) {
        const summand = setIsBee ? +1 : -1;
        const cell = this.getCellWithId(id);

        if (cell.isBee !== setIsBee) {
            cell.setIsBee(setIsBee);

            R.forEach((neighbor) => {
                neighbor.setNeighboringBees(neighbor.neighboringBees + summand);
            })(this.getNeighborsOfCellWithId(cell.id));
        }

        return this;
    };

    changeBeeStatusForCellsWithIds(ids, setIsBee = true) {
        R.forEach((cell) => (
            this.changeBeeStatusForCellWithId(cell.id, setIsBee)
        ))(this.getCellsWithIds(ids));

        return this;
    };

    revealAllBees() {
        R.forEach((cell) => {
            if (cell.isBee) {
                cell.setIsFlagged(false);
                cell.setIsRevealed(true);
            }
        })(this.getPrimitiveGrid());

        return this;
    };
};
