import { Cell } from "./Cell"

export class Board {
  private _size: number
  private _mineCount: number
  private _minesPlaced = 0
  private _board: Cell[][]
  private _revealedCount = 0

  constructor(size: number, mineCount: number) {
    this._size = size
    this._mineCount = mineCount

    this._board = []
    for (let i = 0; i < size; i++) {
      this._board.push(new Array(size))
    }

    while (this._minesPlaced < this._mineCount) {
      this._placeMines()
    }

    this._printBoard()
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

  _reveal(row: number, column: number, revealedFromClick: boolean) {
    return this._board[row][column]._reveal(revealedFromClick)
  }

  private _placeMines() {
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        const existingCell = this._board[i][j]
        if (!existingCell || !existingCell.hasMine) {
          if (Math.random() < 1 / this._size) {
            if (this._minesPlaced < this._mineCount) {
              this._board[i][j] = new Cell(i, j, true, this)
              this._minesPlaced++
            } else {
              this._board[i][j] = new Cell(i, j, false, this)
            }
          } else {
            this._board[i][j] = new Cell(i, j, false, this)
          }
        }
      }
    }
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
