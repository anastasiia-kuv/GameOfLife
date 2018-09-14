export default function () {

  let width = 40;
  let height = 30;
  let cells = [];
  let timer = {};
  let isRun = false;
  let speedGame = 500;
  const $body = $('body');

  function _initFieldData(width, height) {
    cells.length = 0;
    for (let i = 0; i < width; i++) {
      cells.push([]);
      for (let j = 0; j < height; j++) {
        cells[i].push(0);
      }
    }
    $body.trigger('updateField');
  }

  _initFieldData(width, height);

  function _checkTopCell(j) {
    if (!j) {
      return height;
    }
    return j;
  }

  function _checkBottomCell(j) {
    if (j === height - 1) {
      return -1;
    }
    return j;
  }

  function _checkLeftCell(i) {
    if (!i) {
      return width;
    }
    return i;
  }

  function _checkRightCell(i) {
    if (i === width - 1) {
      return -1;
    }
    return i;
  }

  function _countNeighbors(i, j) {
    let neighbors = 0;
    if (cells[_checkLeftCell(i) - 1][j]) {
      neighbors += 1;
    }
    if (cells[i][_checkBottomCell(j) + 1]) {
      neighbors += 1;
    }
    if (cells[_checkRightCell(i) + 1][j]) {
      neighbors += 1;
    }
    if (cells[i][_checkTopCell(j) - 1]) {
      neighbors += 1;
    }
    if (cells[_checkLeftCell(i) - 1][_checkBottomCell(j) + 1]) {
      neighbors += 1;
    }
    if (cells[_checkRightCell(i) + 1][_checkBottomCell(j) + 1]) {
      neighbors += 1;
    }
    if (cells[_checkRightCell(i) + 1][_checkTopCell(j) - 1]) {
      neighbors += 1;
    }
    if (cells[_checkLeftCell(i) - 1][_checkTopCell(j) - 1]) {
      neighbors += 1;
    }
    if (!cells[i][j] && neighbors === 3) {
      return 1;
    }
    if (cells[i][j]) {
      if (neighbors === 2 || neighbors === 3) {
        return 1;
      }
    }
  }

  function _step() {
    const tempCells = [];
    for (let i = 0; i < width; i++) {
      tempCells.push([]);
      for (let j = 0; j < height; j++) {
        tempCells[i].push(0);
      }
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        tempCells[i][j] = _countNeighbors(i, j);
      }
    }
    return tempCells;
  }

  function _updateCells() {
    cells = _step();
    $body.trigger('updateField');
  }

  return {
    getCells () {
      return cells;
    },

    getHeight () {
      return height;
    },

    getSpeedGame () {
      return speedGame;
    },

    getWidth () {
      return width;
    },

    initFieldData (width, height) {
      _initFieldData(width, height);
    },

    initNewGame () {
      isRun = false;
      _initFieldData(width, height);
    },

    pause () {
      clearInterval(timer);
      isRun = false;
    },

    start () {
      if (!isRun) {
        timer = setInterval(() => {
          _updateCells();
        }, speedGame);
        isRun = true;
      }
    },

    setHeight (h) {
      height = h;
      $body.trigger('updateSizeCanvas');
    },

    setWidth (w) {
      width = w;
      $body.trigger('updateSizeCanvas');
    },

    updateCellStatus (x, y) {
      !cells[x][y] ? cells[x][y] = 1 : cells[x][y] = 0;
      $body.trigger('updateField');
    },

    updateSpeedGame (speed) {
      speedGame = speed * 100;
      if (isRun) {
        this.pause();
        this.start();
      }
    },

    doOneStep () {
      cells = _step();
      return cells;
    },

    setCells (testCells, w, h) {
      cells = [...testCells];
      width = w;
      height = h;
    }
  };

}
