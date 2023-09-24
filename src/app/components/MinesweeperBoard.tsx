"use client"

import { MouseEvent, useState } from "react"
import { Minesweeper } from "@minesweeper"

const size = 10

export default function MinesweeperBoard() {
  const [minesweeper, setMinesweeper] = useState(
    () => new Minesweeper(size, size)
  )
  const [gameState, setGameState] = useState(minesweeper.getState())

  const render = () => {
    setGameState(minesweeper.getState())
  }

  const handleClick = (e: MouseEvent, row: number, col: number) => {
    e.preventDefault()

    if (gameState.result === "running") {
      if (e.type === "click") {
        minesweeper.reveal(row, col)
      }
      if (e.type === "contextmenu") {
        minesweeper.placeFlag(row, col)
      }
      render()
    }
  }

  const reset = () => {
    const minesweeper = new Minesweeper(size, size)
    setMinesweeper(minesweeper)
    setGameState(minesweeper.getState())
  }

  return (
    <div className="p-10">
      {gameState.board.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center">
          {row.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`bg-gray-300 text-center aspect-square w-8 h-8 flex justify-center items-center border border-gray-400 cursor-pointer`}
              onClick={(e) => handleClick(e, rowIdx, colIdx)}
              onContextMenu={(e) => handleClick(e, rowIdx, colIdx)}
            >
              {col.revealed
                ? col.value === "mine"
                  ? "*"
                  : col.value
                : col.hasFlag
                ? "F"
                : ""}
            </div>
          ))}
        </div>
      ))}
      {gameState.result === "lost" && (
        <>
          <h1>Game over!</h1>
          <button onClick={reset}>Reset</button>
        </>
      )}
      {gameState.result === "won" && (
        <>
          <h1>You won!</h1>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  )
}
