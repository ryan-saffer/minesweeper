import { Cell } from "./Cell"

export class Board {
  size: number
  board: Cell[][]
  constructor(size: number, private mineCount: number) {
    this.size = size
    this.board = []
    for (let i = 0; i < size; i++) {
      const row = []
      for (let j = 0; j < size; j++) {
        if (Math.random() > 0.5) {
          if (this.mineCount > 0) {
            row.push(new Cell(i, j, true, this))
            this.mineCount--
          } else {
            row.push(new Cell(i, j, false, this))
          }
        } else {
          row.push(new Cell(i, j, false, this))
        }
      }
      this.board.push(row)
    }

    this.printBoard()
  }

  printBoard() {
    let output = ""
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const value = this.board[i][j].reveal()
        output += value === "mine" ? "'*'" : `'${value}'`
      }
      output += "\n"
    }

    console.log(output)
  }
}
