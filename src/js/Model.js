import EventObserver from './eventObserver.js';
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
    this.initFieldData(this.width,this.height);
  }

  initFieldData(width, height) {
    this.cells.length = 0;
    for (let i = 0; i < width; i++) {
      this.cells.push([]);
      for (let j = 0; j < height; j++){
        this.cells[i].push(constants.DEAD_CELL);
      }
    }
    this.notify('сhangeField', {cells: this.cells, width: width, height: height});
  }

  checkTopCell(j) {
    if (!j) {
      return this.height;
    }
    return j;
  }

  checkBottomCell(j) {
    if (j === this.height - 1) {
      return -1;
    }
    return j;
  }

  checkLeftCell(i) {
    if (!i) {
      return this.width;
    }
    return i;
  }

  checkRightCell(i) {
    if (i === this.width - 1) {
      return -1;
    }
    return i;
  }

  countNeighbors(i, j) {
    let neighbors = 0;
    if (this.cells[this.checkLeftCell(i) - 1][j]) {
      neighbors += 1;
    }
    if (this.cells[i][this.checkBottomCell(j) + 1]) {
      neighbors += 1;
    }
    if (this.cells[this.checkRightCell(i) + 1][j]) {
      neighbors += 1;
    }
    if (this.cells[i][this.checkTopCell(j) - 1]) {
      neighbors += 1;
    }
    if (this.cells[this.checkLeftCell(i) - 1][this.checkBottomCell(j) + 1]) {
      neighbors += 1;
    }
    if (this.cells[this.checkRightCell(i) + 1][this.checkBottomCell(j) + 1]) {
      neighbors += 1;
    }
    if (this.cells[this.checkRightCell(i) + 1][this.checkTopCell(j) - 1]) {
      neighbors += 1;
    }
    if (this.cells[this.checkLeftCell(i) - 1][this.checkTopCell(j) - 1]) {
      neighbors += 1;
    }
    if (!this.cells[i][j] && neighbors === constants.MAXIMUM_ALIVE_NEIGHBORS) {
      return constants.ALIVE_CELL;
    }
    if (this.cells[i][j]) {
      if (neighbors === constants.MINIMUM_ALIVE_NEIGHBORS || neighbors === constants.MAXIMUM_ALIVE_NEIGHBORS) {
        return constants.ALIVE_CELL;
      }
    }
  }

  step() {
    const tempCells = [];
    for (let i = 0; i < this.width; i++) {
      tempCells.push([]);
      for (let j = 0; j < this.height; j++) {
        tempCells[i].push(constants.DEAD_CELL);
      }
    }
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        tempCells[i][j] = this.countNeighbors(i, j);
      }
    }
    return tempCells;
  }

  updateCells() {
    this.cells = this.step();
    this.notify('сhangeField', {cells: this.cells, width: this.width, height: this.height});
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
    this.initFieldData(this.width, this.height);
  }

  pause () {
    clearInterval(this.timer);
    this.isRun = false;
  }

  start () {
    if (!this.isRun) {
      this.timer = setInterval(() => {
        this.updateCells();
      }, this.speedGame);
      this.isRun = true;
    }
  }

  setSizeCanvas (data) {
    this.height = data.height;
    this.width = data.width;
  }

  updateCellStatus (data) {
    !this.cells[data.x][data.y] ? this.cells[data.x][data.y] = constants.ALIVE_CELL : this.cells[data.x][data.y] = constants.DEAD_CELL;
    this.notify('сhangeField', {cells: this.cells, width: this.width, height: this.height});
  }

  updateSpeedGame (data) {
    this.speedGame = constants.MAX_DELAY - (constants.STEP_DELAY * (data.speed - 1));
    if (this.isRun) {
      this.pause();
      this.start();
    }
  }

  doOneStep () {
    this.cells = this.step();
    return this.cells;
  }

  setCells (testCells, width, height) {
    this.cells = [...testCells];
    this.width = width;
    this.height = height;
  }
}

export default Model;
