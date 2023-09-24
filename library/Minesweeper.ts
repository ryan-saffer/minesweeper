import { Board } from "./Board"

export class Minesweeper {
  board: Board
  constructor(boardSize: number, mineCount: number) {
    this.board = new Board(boardSize, mineCount)
  }
}
