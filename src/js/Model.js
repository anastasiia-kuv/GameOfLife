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
    this.initFieldData(this.width,this.height);
  }

  initFieldData(width, height) {
    this.cells = Array.from({ length: width }, () => Array.from({ length: height }, () => constants.DEAD_CELL));
    this.notify('сhangeField', {cells: this.cells, width: width, height: height});
  }

  checkTopCell(j) {
    return (!j) ? this.height : j;
  }

  checkBottomCell(j) {
    return (j === this.height - 1) ? -1 : j;
  }

  checkLeftCell(i) {
    return (!i) ? this.width : i;
  }

  checkRightCell(i) {
    return (i === this.width - 1) ? -1 : i;
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
    return Array.from({ length: this.width }, (_, i) => Array.from({ length: this.height }, (_, j) => this.countNeighbors(i, j)));
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
    if(!this.isRun) {
      this.timer = setInterval(() => this.updateCells(), this.speedGame);
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
    if(this.isRun) {
      this.pause();
      this.start();
    }
  }

  doOneStep () {
    return this.cells = this.step();
  }

  setCells (testCells, width, height) {
    this.cells = [...testCells];
    this.width = width;
    this.height = height;
  }
}

export default Model;
