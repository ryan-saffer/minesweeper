import { Board } from "./Board"

export class Cell {
  board: Board
  row: number
  column: number
  hasMine: boolean
  revealed = false
  _value = 0

  constructor(row: number, column: number, hasMine: boolean, board: Board) {
    this.board = board
    this.row = row
    this.column = column
    this.hasMine = hasMine
  }

  get value() {
    if (!this._value) {
      this._value = this.calculateValue()
    }
    return this._value
  }

  reveal(): "mine" | number {
    this.revealed = true
    if (this.hasMine) return "mine"
    return this.value
  }

  calculateValue() {
    let count = 0
    for (let i = this.row - 1; i <= this.row + 1; i++) {
      if (i < 0 || i === this.board.size) continue
      for (let j = this.column - 1; j <= this.column + 1; j++) {
        if (j < 0 || j === this.board.size) continue
        if (i === this.row && j == this.column) continue
        const cell = this.board.board[i][j]
        if (cell.hasMine) count++
      }
    }
    return count
  }
}
