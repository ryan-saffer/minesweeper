import { Cell } from "./Cell"

export class Board {
  size: number
  mineCount: number
  minesPlaced = 0
  board: Cell[][]

  constructor(size: number, mineCount: number) {
    this.size = size
    this.mineCount = mineCount

    this.board = []
    for (let i = 0; i < size; i++) {
      this.board.push(new Array(size))
    }

    while (this.minesPlaced < this.mineCount) {
      this.#placeMines()
    }

    console.log("running constructor")
    this.#printBoard()
  }

  reveal(row: number, column: number) {
    return this.board[row][column].reveal()
  }

  #placeMines() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const existingCell = this.board[i][j]
        if (!existingCell || !existingCell.hasMine) {
          if (Math.random() < 1 / this.size) {
            if (this.minesPlaced < this.mineCount) {
              this.board[i][j] = new Cell(i, j, true, this)
              this.minesPlaced++
            } else {
              this.board[i][j] = new Cell(i, j, false, this)
            }
          } else {
            this.board[i][j] = new Cell(i, j, false, this)
          }
        }
      }
    }
  }

  #printBoard() {
    let output = ""
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const value = this.board[i][j].value
        output += value === "mine" ? "'*'" : `'${value}'`
      }
      output += "\n"
    }

    console.log(output)
  }
}
