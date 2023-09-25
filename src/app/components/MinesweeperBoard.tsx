"use client"

import { MouseEvent, useState } from "react"
import { Minesweeper } from "@minesweeper"
import { clsx } from "clsx"
import Flag from "./icons/Flag"
import Mine from "./icons/Mine"
import NumberIcon from "./icons/NumberIcon"
import IncorrectFlag from "./icons/IncorrectFlag"

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

  const renderIcon = (
    revealed: boolean,
    hasFlag: boolean,
    value: "mine" | number
  ) => {
    if (revealed) {
      if (value !== "mine" && hasFlag) {
        return <IncorrectFlag />
      }
      if (value === "mine") {
        return <Mine />
      }
      return <NumberIcon value={value} />
    } else {
      if (hasFlag) {
        return <Flag />
      } else {
        return ""
      }
    }
  }

  return (
    <div className="p-10">
      {gameState.board.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center">
          {row.map((cell, colIdx) => (
            <div
              key={colIdx}
              className={clsx(
                "bg-[#BDBDBD] text-center font-bold text-3xl aspect-square w-10 h-10 flex justify-center items-center border border-[#848484] cursor-pointer relative",
                {
                  "border-t-white border-t-4 border-l-white border-l-4 border-b-[#7B7B7B] border-b-4 border-r-[#7B7B7B] border-r-4":
                    !cell.revealed,
                  "border-t-[#7B7B7B] border-t border-b-[#7B7B7B] border-b":
                    cell.revealed,
                  "bg-[#fc0303]": cell.isLosingMine,
                }
              )}
              onClick={(e) => handleClick(e, rowIdx, colIdx)}
              onContextMenu={(e) => handleClick(e, rowIdx, colIdx)}
            >
              {renderIcon(cell.revealed, cell.hasFlag, cell.value)}
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
