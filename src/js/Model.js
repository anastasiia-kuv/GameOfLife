import EventObserver from './EventObserver.js';
import constants from './constants.js';
class Model extends EventObserver {
  constructor(){
    super();
    this.width = constants.DEFAULT_WIDTH;
    this.height =  constants.DEFAULT_HEIGHT;
    this.speedGame = constants.DEFAULT_DELAY;
    this.cells = [];
    this.timer = {};
    this.isRun = false;
    this.initFieldData(this.height, this.width);
  }

  initFieldData(height, width) {
    this.cells = Array.from({ length: height }, () => Array.from({ length: width }, () => constants.DEAD_CELL));
    this.notify('сhangeField', {cells: this.cells, width: width, height: height});
  }

  step() {
    return Array.from({ length: this.height }, (_, i) => Array.from({ length: this.width }, (_, j) => this.getNextCellStatus(i, j)));
  }

  getNextCellStatus(row, column){
    const countAliveNeighbours = this.getCountAliveNeighbours(row, column, this.cells);
    if (!this.cells[row][column] && countAliveNeighbours === constants.MAXIMUM_ALIVE_NEIGHBORS) {
      return constants.ALIVE_CELL;
    }
    if (this.cells[row][column]) {
      if (countAliveNeighbours === constants.MINIMUM_ALIVE_NEIGHBORS || countAliveNeighbours === constants.MAXIMUM_ALIVE_NEIGHBORS) {
        return constants.ALIVE_CELL;
      }
    }
  }

  getCountAliveNeighbours(row, column, cells) {
    const indexes = [-1, 0, 1];
    return indexes.reduce((count, i) => {
        let indexRow = row + i;
        if (!cells[indexRow]) {
            return count;
        }
        return count + indexes.reduce((countInRow, j) => {
            let indexCell = column + j;
            if (!cells[indexRow][indexCell] || (i === 0 && j === 0)) {
                return countInRow;
            }
            return countInRow + 1;
        }, 0);
    }, 0);
  }

  updateCells() {
    this.cells = this.step();
    this.notify('сhangeField', {cells: this.cells, height: this.height, width: this.width});
  }

  getCells () {
    return this.cells;
  }

  getHeight () {
    return this.height;
  }

  getSpeedGame () {
    return this.speedGame;
  }

  getWidth () {
    return this.width;
  }

  initNewGame () {
    this.isRun = false;
    this.initFieldData(this.height, this.width);
  }

  start () {
    if(!this.isRun) {
      this.timer = setInterval(() => this.updateCells(), this.speedGame);
      this.isRun = true;
    }
  }

  pause () {
    clearInterval(this.timer);
    this.isRun = false;
  }

  setSizeCanvas (data) {
    this.height = data.height;
    this.width = data.width;
  }

  updateCellStatus (data) {
    !this.cells[data.x][data.y] ? this.cells[data.x][data.y] = constants.ALIVE_CELL : this.cells[data.x][data.y] = constants.DEAD_CELL;
    this.notify('сhangeField', {cells: this.cells, height: this.height, width: this.width});
  }

  updateSpeedGame (data) {
    this.speedGame = constants.MAX_DELAY - (constants.STEP_DELAY * (data.speed - 1));
    if(this.isRun) {
      this.pause();
      this.start();
    }
  }

  doOneStep () {
    return this.cells = this.step();
  }

  setCells (testCells, height, width) {
    this.cells = [...testCells];
    this.width = width;
    this.height = height;
  }
}

export default Model;
