import { useState } from "react"
import { Minesweeper } from "@minesweeper"

export default function MinesweeperBoard() {
  const [minesweeper, setMinesweeper] = useState(new Minesweeper(10, 20))
  const [gameState, setGameState] = useState(minesweeper.getState())

  const render = () => {
    setGameState(minesweeper.getState())
  }

  const reset = () => {
    const minesweeper = new Minesweeper(10, 20)
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
              onClick={() => {
                if (gameState.isRunning) {
                  minesweeper.reveal(rowIdx, colIdx)
                  render()
                }
              }}
            >
              {col.revealed ? (col.value === "mine" ? "*" : col.value) : ""}
            </div>
          ))}
        </div>
      ))}
      {!gameState.isRunning && (
        <>
          <h1>Game over!</h1>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  )
}
