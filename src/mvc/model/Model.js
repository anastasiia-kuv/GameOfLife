import EventObserver from '../event-observer/EventObserver.js';
import constants from '../constants.js';
class Model extends EventObserver {
  constructor(){
    super();
    this.width = constants.DEFAULT_WIDTH;
    this.height =  constants.DEFAULT_HEIGHT;
    this.gameSpeed = constants.DEFAULT_DELAY;
    this.matrix = [];
    this.pastMatrixStates = [];
    this.timer = {};
    this.isRuning = false;
    this.initMatrix(this.height, this.width);
  }

  initMatrix(height, width) {
    this.matrix = Array.from({ length: height }, () => Array.from({ length: width }, () => constants.DEAD_CELL));
    this.pastMatrixStates = [];
    this.notify('сhangeField', {matrix: this.matrix, width: width, height: height});
  }

  updateCell (data) {
    this.matrix[data.x][data.y] = this.matrix[data.x][data.y] ? constants.DEAD_CELL : constants.ALIVE_CELL;
    this.notify('сhangeField', {matrix: this.matrix, height: this.height, width: this.width});
  }

  updateMatrix() {
    this.isMatrixRepeated() ? this.notify('endGame') : 0;
    this.matrix = this.step();
    this.notify('сhangeField', {matrix: this.matrix, height: this.height, width: this.width});
  }

  isMatrixRepeated() {
    let result = this.pastMatrixStates.some((matrix) => matrix.every((row, i) => row.every((cell, j) => (cell === this.matrix[i][j]))));
    result ? this.pastMatrixStates = [] : this.pastMatrixStates.push(this.matrix);
    return result;
  }

  step() {
    return Array.from({ length: this.height }, (_, i) => Array.from({ length: this.width }, (_, j) => this.getNextMatrixState(i, j)));
  }

  getNextMatrixState(row, column){
    const countAliveNeighbours = this.getCountAliveNeighbours(row, column, this.matrix);
    if (!this.matrix[row][column] && countAliveNeighbours === constants.MAXIMUM_ALIVE_NEIGHBORS) {
      return constants.ALIVE_CELL;
    } else if(!this.matrix[row][column] && countAliveNeighbours < constants.MAXIMUM_ALIVE_NEIGHBORS || countAliveNeighbours > constants.MAXIMUM_ALIVE_NEIGHBORS) {
      return constants.DEAD_CELL;
    }

    if (this.matrix[row][column]) {
      if (countAliveNeighbours === constants.MINIMUM_ALIVE_NEIGHBORS || countAliveNeighbours === constants.MAXIMUM_ALIVE_NEIGHBORS) {
        return constants.ALIVE_CELL;
      } else {
        return constants.DEAD_CELL;
      }
    }
  }

  getCountAliveNeighbours(row, column, matrix) {
    const indexes = [-1, 0, 1];
    return indexes.reduce((count, i) => {
        let indexRow = row + i;
        if (!matrix[indexRow]) {
            return count;
        }
        return count + indexes.reduce((countInRow, j) => {
            let indexCell = column + j;
            if (!matrix[indexRow][indexCell] || (i === 0 && j === 0)) {
                return countInRow;
            }
            return countInRow + 1;
        }, 0);
    }, 0);
  }

  initNewGame () {
    this.isRuning = false;
    this.initMatrix(this.height, this.width);
  }

  start () {
    if(!this.isRuning) {
      this.timer = setInterval(() => this.updateMatrix(), this.gameSpeed);
      this.isRuning = true;
    }
  }

  pause () {
    clearInterval(this.timer);
    this.isRuning = false;
  }

  end () {
    clearInterval(this.timer);
    this.isRuning = false;
    this.notify('initGame')
    alert('The End');
  }

  setFieldSize (data) {
    this.height = data.height;
    this.width = data.width;
  }

  updateGameSpeed (data) {
    this.gameSpeed = constants.MAX_DELAY - (constants.STEP_DELAY * (data.speed - 1));
    if(this.isRuning) {
      this.notify('pauseGame')
      this.notify('startGame')
    }
  }
}

export default Model;
