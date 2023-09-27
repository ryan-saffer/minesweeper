import { Cell } from "./Cell"

export class Board {
  private _size: number
  private _mineCount: number
  private _minesPlaced = 0
  private _board: Cell[][]
  private _revealedCount = 0
  private _flagsPlaced = 0

  constructor(size: number, mineCount: number) {
    this._size = size
    this._mineCount = mineCount

    this._board = []
    for (let i = 0; i < size; i++) {
      const row = []
      for (let j = 0; j < size; j++) {
        row.push(new Cell(i, j, false, this))
      }
      this._board.push(row)
    }
  }

  initialiseBoard(clickedRow: number, clickedColumn: number) {
    while (this._minesPlaced < this._mineCount) {
      this._placeMines(clickedRow, clickedColumn)
    }
  }

  get board() {
    return this._board
  }

  get size() {
    return this._size
  }

  get revealedCount() {
    return this._revealedCount
  }

  get flagsPlaced() {
    return this._flagsPlaced
  }

  increaseRevealedCount() {
    this._revealedCount++
  }

  revealAllMines() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const cell = this._board[i][j]
        if (cell.hasMine || (cell.hasFlag && !cell.hasMine)) {
          cell._reveal()
        }
      }
    }
  }

  revealBoard() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const cell = this._board[i][j]
        if (cell.hasMine && !cell.hasFlag) {
          cell.toggleFlag()
        } else {
          cell._reveal()
        }
      }
    }
  }

  toggleFlag(row: number, column: number) {
    const cell = this._board[row][column]
    cell.toggleFlag()
    if (cell.hasFlag) {
      this._flagsPlaced++
    } else if (cell.hasQuestionMark) {
      this._flagsPlaced--
    }
  }

  _reveal({
    row,
    column,
    revealedFromClick,
    isFirstClick,
  }: {
    row: number
    column: number
    revealedFromClick: boolean
    isFirstClick: boolean
  }) {
    if (isFirstClick) {
      this.initialiseBoard(row, column)
    }
    return this._board[row][column]._reveal(revealedFromClick)
  }

  private _placeMines(clickedRow: number, clickedColum: number) {
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        if (this.isNeighbour(i, j, clickedRow, clickedColum)) {
          continue
        }
        if (!this._board[i][j].hasMine && this._minesPlaced < this._mineCount) {
          if (Math.random() < 1 / this._size) {
            this._board[i][j] = new Cell(i, j, true, this)
            this._minesPlaced++
          }
        }
      }
    }
  }

  private isNeighbour(
    row: number,
    column: number,
    clickedRow: number,
    clickedColum: number
  ) {
    const isRowNeighbour =
      clickedRow === row || clickedRow === row - 1 || clickedRow === row + 1
    const isColumnNeighbour =
      clickedColum === column ||
      clickedColum === column - 1 ||
      clickedColum === column + 1
    return isRowNeighbour && isColumnNeighbour
  }

  private _printBoard() {
    let output = ""
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const value = this._board[i][j].value
        output += value === "mine" ? "'*'" : `'${value}'`
      }
      output += "\n"
    }

    console.log(output)
  }
}
