import { Board } from "./Board"

export class Minesweeper {
  #board: Board

  #isRunning = true

  constructor(boardSize: number, mineCount: number) {
    this.#board = new Board(boardSize, mineCount)
  }

  reveal(row: number, column: number) {
    const result = this.#board.reveal(row, column)
    if (result === "mine") {
      this.#isRunning = false
    }
  }

  getState() {
    return {
      minesPlaced: 5,
      board: this.#board.board,
      isRunning: this.#isRunning,
    }
  }
}
