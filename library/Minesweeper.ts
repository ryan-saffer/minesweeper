import { Subject } from "rxjs"
import { Board } from "./Board"

type GameState = {
  flagsLeft: number
  board: Board["_board"]
  result: "running" | "won" | "lost"
  secondsPlayed: number
}

export class Minesweeper {
  private _board: Board
  private _mineCount: number
  private _result: GameState["result"] = "running"
  private _gameState$ = new Subject<GameState>()
  private _secondsPlayed = 0
  private _timeout: NodeJS.Timeout
  private _performedFirstClick = false

  constructor(boardSize: number, mineCount: number) {
    this._board = new Board(boardSize, mineCount)
    this._mineCount = mineCount

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
      flagsLeft: this._mineCount,
      board: this._board.board,
      result: "running",
      secondsPlayed: 0,
    }
  }

  reveal(row: number, column: number) {
    if (this._result !== "running") return "finished"
    const result = this._board._reveal({
      row,
      column,
      revealedFromClick: true,
      isFirstClick: !this._performedFirstClick,
    })
    if (!this._performedFirstClick) {
      this._performedFirstClick = true
    }
    if (result === "mine") {
      this._result = "lost"
      this._board.revealAllMines()
      this._stopClock()
    }
    // check for win
    else if (
      this._board.size * this._board.size - this._mineCount ===
      this._board.revealedCount
    ) {
      this._result = "won"
      this._board.revealBoard()
      this._stopClock()
    }
    this._emitState()
    return result
  }

  private _stopClock() {
    clearInterval(this._timeout)
  }

  toggleFlag(row: number, column: number) {
    if (this._result !== "running") return 'finished'
    const result = this._board.toggleFlag(row, column)
    this._emitState()
    return result
  }

  private _emitState() {
    this._gameState$.next({
      flagsLeft: this._mineCount - this._board.flagsPlaced,
      board: this._board.board,
      result: this._result,
      secondsPlayed: this._secondsPlayed,
    })
  }
}
