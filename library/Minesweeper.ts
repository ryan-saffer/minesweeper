import { Subject } from "rxjs"
import { Board } from "./Board"

type GameState = {
  minesPlaced: number
  board: Board["_board"]
  result: "running" | "won" | "lost"
  secondsPlayed: number
}

export class Minesweeper {
  private _board: Board
  private _result: GameState["result"] = "running"
  private _gameState$ = new Subject<GameState>()
  private _secondsPlayed = 0
  private _timeout: NodeJS.Timeout

  constructor(boardSize: number, private _mineCount: number) {
    this._board = new Board(boardSize, _mineCount)

    this._timeout = setInterval(() => {
      this._secondsPlayed++
      this._emitState()
    }, 1000)
  }

  get gameState$() {
    return this._gameState$.asObservable()
  }

  get initialState(): GameState {
    return {
      minesPlaced: 0,
      board: this._board.board,
      result: "running",
      secondsPlayed: 0,
    }
  }

  reveal(row: number, column: number) {
    if (this._result !== "running") return
    const result = this._board._reveal(row, column, true)
    if (result === "mine") {
      this._result = "lost"
      this._board.revealAllMines()
      this._stopClock()
    }
    // check for win
    if (
      this._board.size * this._board.size - this._mineCount ===
      this._board.revealedCount
    ) {
      this._result = "won"
      this._board.revealBoard()
      this._stopClock()
    }
    this._emitState()
  }

  private _stopClock() {
    clearInterval(this._timeout)
  }

  toggleFlag(row: number, column: number) {
    this._board.board[row][column].toggleFlag()
    this._emitState()
  }

  private _emitState() {
    this._gameState$.next({
      minesPlaced: 0,
      board: this._board.board,
      result: this._result,
      secondsPlayed: this._secondsPlayed,
    })
  }
}
