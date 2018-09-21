class Model {
  constructor(){
    this.width = 40;
    this.height = 30;
    this.cells = [];
    this.timer = {};
    this.isRun = false;
    this.speedGame = 600;
  }

  setObserver(observer) {
    this.observer = observer;
    this.initFieldData(this.width,this.height);
  }

  initFieldData(width, height) {
    this.cells.length = 0;
    for (let i = 0; i < width; i++) {
      this.cells.push([]);
      for (let j = 0; j < height; j++) {
        this.cells[i].push(0);
      }
    }
    this.observer.notify({nameEvent: 'updateField'});
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
    if (!this.cells[i][j] && neighbors === 3) {
      return 1;
    }
    if (this.cells[i][j]) {
      if (neighbors === 2 || neighbors === 3) {
        return 1;
      }
    }
  }

  step() {
    const tempCells = [];
    for (let i = 0; i < this.width; i++) {
      tempCells.push([]);
      for (let j = 0; j < this.height; j++) {
        tempCells[i].push(0);
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
    this.observer.notify({nameEvent: 'updateField'});
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

  setHeight (h) {
    this.height = h;
    this.observer.notify({nameEvent: 'updateSizeCanvas', width: this.width, height: this.height});
  }

  setWidth (w) {
    this.width = w;
    this.observer.notify({nameEvent: 'updateSizeCanvas', width: this.width, height: this.height});
  }

  updateCellStatus (x, y) {
    !this.cells[x][y] ? this.cells[x][y] = 1 : this.cells[x][y] = 0;
    this.observer.notify({nameEvent: 'updateField'});
  }

  updateSpeedGame (speed) {
    switch (speed) {
      case '1':
        this.speedGame = 1000;
        break;
      case '2':
        this.speedGame = 800;
        break;
      case '3':
        this.speedGame = 600;
        break;
      case '4':
        this.speedGame = 400;
        break;
      case '5':
        this.speedGame = 200;
        break;
      default:
        this.speedGame = 600;
    }
    if (this.isRun) {
      this.pause();
      this.start();
    }
  }

  doOneStep () {
    this.cells = this.step();
    return this.cells;
  }

  setCells (testCells, w, h) {
    this.cells = [...testCells];
    this.width = w;
    this.height = h;
  }
}

export default Model;
