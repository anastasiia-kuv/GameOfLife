import EventObserver from '../utils/EventObserver';
import constants from '../constants';

class Model extends EventObserver {
  constructor() {
    super();
    super.addEmitter(this.constructor.name);
    this.width = constants.DEFAULT_WIDTH;
    this.height = constants.DEFAULT_HEIGHT;
    this.gameSpeed = constants.DEFAULT_DELAY;
    this.isRunning = false;
    this.initMatrix(this.width, this.height);
  }

  initMatrix(width, height) {
    this.matrix = Array.from(
      { length: width }, () => Array.from(
        { length: height }, () => constants.ZEROED,
      ),
    );
    this.pastMatrixStates = [];
    this.notify('сhangeField', this.matrix);
  }

  updateMatrixElementValue(position) {
    const { x, y } = position;
    const i = x === this.width ? x - 1 : x;
    const j = y === this.height ? y - 1 : y;
    this.matrix[i][j] = this.matrix[i][j] ? constants.ZEROED : constants.ASSIGNED;
    const updatedMatrix = this.matrix;
    this.notify('сhangeField', updatedMatrix);
  }

  updateMatrix() {
    if (this.isMatrixRepeated()) {
      this.pastMatrixStates = [];
      this.notify('endGame');
    } else {
      this.pastMatrixStates.push(this.matrix);
      this.matrix = this.step();
      this.notify('сhangeField', this.matrix);
    }
  }

  isMatrixRepeated() {
    return this.pastMatrixStates.some(matrix => matrix.every(
      (row, i) => row.every(
        (cell, j) => (cell === this.matrix[i][j]),
      ),
    ));
  }

  step() {
    return Array.from(
      { length: this.width }, (row, i) => Array.from(
        { length: this.height }, (col, j) => this.getCellState(i, j),
      ),
    );
  }

  getCellState(row, column) {
    const countAliveNeighbours = this.getCountAliveNeighbours(row, column);
    if (!this.matrix[row][column]) {
      if (countAliveNeighbours === constants.MAXIMUM_ALIVE_NEIGHBORS) {
        return constants.ASSIGNED;
      }
      if (countAliveNeighbours < constants.MAXIMUM_ALIVE_NEIGHBORS
        || countAliveNeighbours > constants.MAXIMUM_ALIVE_NEIGHBORS) {
        return constants.ZEROED;
      }
    } else {
      if (countAliveNeighbours === constants.MINIMUM_ALIVE_NEIGHBORS
        || countAliveNeighbours === constants.MAXIMUM_ALIVE_NEIGHBORS) {
        return constants.ASSIGNED;
      }
      return constants.ZEROED;
    }
  }

  getCountAliveNeighbours(row, column) {
    const indexes = [-1, 0, 1];
    return indexes.reduce((count, i) => {
      const indexRow = row + i;
      if (!this.matrix[indexRow]) {
        return count;
      }
      return count + indexes.reduce((countInRow, j) => {
        const indexCell = column + j;
        if (!this.matrix[indexRow][indexCell] || (i === 0 && j === 0)) {
          return countInRow;
        }
        return countInRow + 1;
      }, 0);
    }, 0);
  }

  initNewGame() {
    this.isRunning = false;
    this.initMatrix(this.width, this.height);
  }

  start() {
    if (!this.isRunning) {
      this.timer = setInterval(() => this.updateMatrix(), this.gameSpeed);
      this.isRunning = true;
    }
  }

  pause() {
    clearInterval(this.timer);
    this.isRunning = false;
  }

  end() {
    clearInterval(this.timer);
    this.isRunning = false;
    this.notify('initGame');
    alert('The End');
  }

  setFieldSize(size) {
    const { width, height } = size;
    this.height = height;
    this.width = width;
  }

  updateGameSpeed(speed) {
    this.gameSpeed = constants.MAX_DELAY - (constants.STEP_DELAY * (speed - 1));
    if (this.isRunning) {
      this.notify('pauseGame');
      this.notify('startGame');
    }
  }

  getClassName() {
    return this.constructor.name;
  }
}

export default Model;
