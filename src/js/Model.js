export default function () {

  let width = 40;
  let height = 30;
  let cells = [];
  let timer = {};
  let isRun = false;
  let speedGame = 500;

  function initFieldData(width, height) {
    cells.length = 0;
    for (let i = 0; i < width; i++) {
      cells.push([]);
      for (let j = 0; j < height; j++) {
        cells[i].push(0);
      }
    }
    const $body = $('body');
    $body.trigger('updateField');

  }

  initFieldData(width, height);

  function checkTop(j) {
    if (!j) {
      return height;
    }
    return j;
  }

  function checkBottom(j) {
    if (j === height - 1) {
      return -1;
    }
    return j;
  }

  function checkLeft(i) {
    if (!i) {
      return width;
    }
    return i;
  }

  function checkRight(i) {
    if (i === width - 1) {
      return -1;
    }
    return i;
  }

  function countNeighbors(i, j) {
    let neighbors = 0;
    if (cells[checkLeft(i) - 1][j]) {
      neighbors += 1;
    }
    if (cells[i][checkBottom(j) + 1]) {
      neighbors += 1;
    }
    if (cells[checkRight(i) + 1][j]) {
      neighbors += 1;
    }
    if (cells[i][checkTop(j) - 1]) {
      neighbors += 1;
    }
    if (cells[checkLeft(i) - 1][checkBottom(j) + 1]) {
      neighbors += 1;
    }
    if (cells[checkRight(i) + 1][checkBottom(j) + 1]) {
      neighbors += 1;
    }
    if (cells[checkRight(i) + 1][checkTop(j) - 1]) {
      neighbors += 1;
    }
    if (cells[checkLeft(i) - 1][checkTop(j) - 1]) {
      neighbors += 1;
    }
    return !cells[i][j] && neighbors === 3 || cells[i][j] && (neighbors === 2 || neighbors === 3) ? 1 : 0;
  }

  function step() {
    const tempCells = [];
    for (let i = 0; i < width; i++) {
      tempCells.push([]);
      for (let j = 0; j < height; j++) {
        tempCells[i].push(0);
      }
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        tempCells[i][j] = countNeighbors(i, j);
      }
    }
    return tempCells;
  }

  function updateCells() {
    cells = step();
    const $body = $('body');
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
      initFieldData(width, height);
    },

    newGame () {
      isRun = false;
      initFieldData(width, height);
    },

    pause () {
      clearInterval(timer);
      isRun = false;
    },

    start () {
      if (!isRun) {
        timer = setInterval(() => {
          updateCells();
        }, speedGame);
        isRun = true;
      }
    },

    setHeight (h) {
      height = h;
      const $body = $('body');
      $body.trigger('updateSizeCanvas');
    },

    setWidth (w) {
      width = w;
      const $body = $('body');
      $body.trigger('updateSizeCanvas');
    },

    updateCellStatus (x, y) {
      !cells[x][y] ? cells[x][y] = 1 : cells[x][y] = 0;
      const $body = $('body');
      $body.trigger('updateField');
    },

    updateSpeedGame (speed) {
      speedGame = speed * 100;
      if (isRun) {
        this.pause();
        this.start();
      }
    },

    oneStep () {
      cells = step();
      return cells;
    },

    setCells (testCells, w, h) {
      cells = [...testCells];
      width = w;
      height = h;
    }
  };

}
