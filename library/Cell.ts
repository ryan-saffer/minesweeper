import { Board } from "./Board"

export class Cell {
  private _board: Board
  private _row: number
  private _column: number
  private _hasMine: boolean
  private _revealed = false
  private _hasFlag = false
  private _hasQuestionMark = false
  private _value = 0
  private _isLosingMine = false

  constructor(row: number, column: number, hasMine: boolean, board: Board) {
    this._board = board
    this._row = row
    this._column = column
    this._hasMine = hasMine
  }

  get value() {
    if (this.hasMine) return "mine"
    if (!this._value) {
      this._value = this._calculateValue()
    }
    return this._value
  }

  get revealed() {
    return this._revealed
  }

  get hasMine() {
    return this._hasMine
  }

  get hasFlag() {
    return this._hasFlag
  }

  get hasQuestionMark() {
    return this._hasQuestionMark
  }

  get isLosingMine() {
    return this._isLosingMine
  }

  private _iterateNeighbours(cb: (cell: Cell) => void) {
    for (let i = this._row - 1; i <= this._row + 1; i++) {
      if (i < 0 || i === this._board.size) continue
      for (let j = this._column - 1; j <= this._column + 1; j++) {
        if (j < 0 || j === this._board.size) continue
        if (i === this._row && j == this._column) continue
        const cell = this._board.board[i][j]
        cb(cell)
      }
    }
  }

  _reveal(revealedFromClick = false) {
    if (this.revealed) return
    if (this._hasFlag && this._hasMine) return
    if (this._hasFlag && revealedFromClick) return
    if (revealedFromClick && this._hasMine) {
      this._isLosingMine = true
    }
    this._revealed = true
    this._board.increaseRevealedCount()
    if (this.hasMine) return "mine"

    // check all neighbours for 0, and if so, reveal
    if (this.value === 0 && !this.hasFlag) {
      this._iterateNeighbours((cell) => {
        if (!cell.revealed) {
          cell._reveal(revealedFromClick)
        }
      })
    }
  }

  private _calculateValue() {
    let count = 0
    this._iterateNeighbours((cell) => {
      if (cell.hasMine) {
        count++
      }
    })
    return count
  }

  toggleFlag() {
    if (!this.revealed) {
      if (this._hasFlag) {
        this._hasFlag = false
        this._hasQuestionMark = true
      } else if (this._hasQuestionMark) {
        this._hasQuestionMark = false
      } else {
        this._hasFlag = true
      }
    }
  }
}
