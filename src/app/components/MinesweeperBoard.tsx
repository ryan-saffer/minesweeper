"use client"

import { MouseEvent, useState } from "react"
import { Minesweeper } from "@minesweeper"
import { clsx } from "clsx"

const size = 10

export default function MinesweeperBoard() {
  const [minesweeper, setMinesweeper] = useState(
    () => new Minesweeper(size, size * 2)
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
    const minesweeper = new Minesweeper(size, size * 2)
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
              className={clsx(
                "text-center font-bold aspect-square w-8 h-8 flex justify-center items-center border border-gray-500 cursor-pointer",
                {
                  "bg-gray-300": !col.revealed,
                  "bg-gray-400": col.revealed,
                  "text-blue-600": col.revealed && col.value === 1,
                  "text-green-700": col.revealed && col.value === 2,
                  "text-red-500": col.revealed && col.value === 3,
                  "text-blue-950": col.revealed && col.value === 4,
                  "text-amber-900": col.revealed && col.value === 5,
                  "text-black": col.revealed && col.hasMine,
                }
              )}
              onClick={(e) => handleClick(e, rowIdx, colIdx)}
              onContextMenu={(e) => handleClick(e, rowIdx, colIdx)}
            >
              {col.revealed
                ? col.value === "mine"
                  ? "💣"
                  : col.value !== 0
                  ? col.value
                  : ""
                : col.hasFlag
                ? "🚩"
                : ""}
            </div>
          ))}
        </div>
      ))}
      {gameState.result !== "running" && (
        <div className="flex flex-col justify-center items-center pt-8">
          <h1 className="text-center text-2xl pb-2">
            {gameState.result === "lost" ? "You lost!" : "You won!"}
          </h1>
          <button
            className="bg-red-400 w-min px-5 py-2 mt-2 rounded-md"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}
