/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve(boardString) {
  // board - массив преобразованный из строки boardString функцией getArrayFromString 
  const board = getArrayFromString(boardString);
  // size - размер нашего судоку
  function solveSudoku() {
    const size = board.length;
    // boxSize - размер нашего сектора 3х3 , 4х4, 5х5
    const boxSize = Math.sqrt(size);
    // текущая позиция пустой ячейки
    const currentPosition = findEmpty(board, size);

    if (currentPosition === null) {
      return true;
    }

    for (let i = 1; i < size + 1; i++) {
      const currentNumber = i.toString();
      const isValidate = isValid(currentNumber, currentPosition, board, size, boxSize);
      if (isValidate) {
        const [x, y] = currentPosition;
        board[x][y] = currentNumber;

        if (solveSudoku()) {
          return true;
        }
        board[x][y] = '-';
      }
    }
  }
  solveSudoku();
  return board;
}

function findEmpty(board, size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === '-') {
        return [i, j];
      }
    }
  }
  return null;
}

function getArrayFromString(boardString) {
  const arr = [];
  let count = 0;
  for (let i = 0; i < 9; i++) {
    arr[i] = [];
    for (let j = 0; j < 9; j++) {
      arr[i].push(boardString[count++]);
    }
  }
  return arr;
}
/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {
  return board.every(el => !el.includes('-'))
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {
  return board.map(el => el.join(' | ')).join('\n')
}

function isValid(currentNumber, currentPosition, board, size, boxSize) {
  const [row, cell] = currentPosition;
  //Чекаем строки
  for (let i = 0; i < size; i++) {
    if (board[i][cell] === currentNumber && i !== row) {
      return false;
    }
  }
  //Чекаем колонки
  for (let i = 0; i < size; i++) {
    if (board[row][i] === currentNumber && i !== cell) {
      return false;
    }
  }
  // чекаем квадрат/бокс 3х3
  //boxRows вычисляем индекс строки в которой находится квадрат который мы будем щас проверять
  //boxCells вычисляем индекс колонки в колторой нахоидтся квадрат...
  const boxRows = Math.floor(row / boxSize) * boxSize;
  const boxCells = Math.floor(cell / boxSize) * boxSize;
  for (let i = boxRows; i < boxRows + boxSize; i++) {
    for (let j = boxCells; j < boxCells + boxSize; j++) {
      if (board[i][j] === currentNumber && i !== row && j !== cell) {
        return false;
      }
    }
  }
  return true;
}
// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
