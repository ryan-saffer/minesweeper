import { Board } from "./Board"

export class Minesweeper {
  private _board: Board
  private _result: "running" | "won" | "lost" = "running"

  constructor(boardSize: number, private _mineCount: number) {
    this._board = new Board(boardSize, _mineCount)
  }

  reveal(row: number, column: number) {
    const result = this._board._reveal(row, column)
    if (result === "mine") {
      this._result = "lost"
    }
    // check for win
    if (
      this._board.size * this._board.size - this._mineCount ===
      this._board.revealedCount
    ) {
      this._result = "won"
    }
  }

  placeFlag(row: number, column: number) {
    this._board.board[row][column].toggleFlag()
  }

  getState() {
    return {
      minesPlaced: 5,
      board: this._board.board,
      result: this._result,
    }
  }
}
