"use client"

import { Fragment, MouseEvent, useEffect, useState } from "react"
import { Minesweeper } from "@minesweeper"
import { clsx } from "clsx"
import Flag from "./icons/Flag"
import Mine from "./icons/Mine"
import NumberIcon from "./icons/NumberIcon"
import IncorrectFlag from "./icons/IncorrectFlag"
import QuestionMark from "./icons/QuestionMark"
import Border, { TopBottomBorder } from "./Border"
import Header from "./Header"
import useIsMouseDown from "../app/hooks/useIsMouseDown"
import { twMerge } from "tw-merge"

export default function MinesweeperBoard({
  size,
  mines,
}: {
  size: number
  mines: number
}) {
  const [minesweeper, setMinesweeper] = useState(
    () => new Minesweeper(size, mines)
  )
  const [gameState, setGameState] = useState(minesweeper.initialState)

  useEffect(() => {
    const subscription = minesweeper.gameState$.subscribe((state) => {
      setGameState(state)
    })
    return () => subscription.unsubscribe()
  }, [minesweeper])

  const mouseIsDown = useIsMouseDown()
  const [[hoveredRow, hoveredCol], setHoveredCell] = useState<[number, number]>(
    [-1, -1]
  )

  const handleClick = (e: MouseEvent, row: number, col: number) => {
    e.preventDefault()

    if (e.type === "mouseup") {
      if (e.button === 2) return
      minesweeper.reveal(row, col)
    }
    if (e.type === "contextmenu") {
      minesweeper.toggleFlag(row, col)
    }
  }

  const reset = () => {
    const minesweeper = new Minesweeper(size, mines)
    setMinesweeper(minesweeper)
    setGameState(minesweeper.initialState)
  }

  const isHoveredOn = (row: number, column: number) => {
    return (
      row === hoveredRow &&
      column === hoveredCol &&
      gameState.result === "running"
    )
  }

  const renderIcon = (
    revealed: boolean,
    hasFlag: boolean,
    hasQuestionMark: boolean,
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
      } else if (hasQuestionMark) {
        return <QuestionMark />
      } else {
        return ""
      }
    }
  }

  return (
    <div
      className={clsx({
        "flex justify-center": window.innerWidth > 40 * size + 40,
      })}
    >
      <Header
        size={size}
        time={gameState.secondsPlayed}
        flagsLeft={gameState.flagsLeft}
        face={
          gameState.result === "running"
            ? "happy"
            : gameState.result === "lost"
            ? "sad"
            : "sunglasses"
        }
        reset={reset}
      />
      <div
        className="grid w-max mt-[70px] overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${size + 2}, auto)`,
          gridTemplateRows: `repeat(${size + 2}, auto)`,
        }}
      >
        <TopBottomBorder type="top" includeCorner={false} size={size} />
        {gameState.board.map((row, rowIdx) => (
          <Fragment key={rowIdx}>
            {row.map((cell, colIdx) => (
              <Fragment key={colIdx}>
                {colIdx === 0 && <Border type="left" />}
                <div
                  className={twMerge(
                    clsx(
                      "bg-[#BDBDBD] w-10 h-10 flex justify-center items-center border cursor-pointer border-t-white border-t-4 border-l-white border-l-4 border-b-[#7B7B7B] border-b-4 border-r-[#7B7B7B] border-r-4",
                      {
                        "border-[#7B7B7B] border":
                          cell.revealed ||
                          (!cell.hasFlag &&
                            mouseIsDown &&
                            isHoveredOn(rowIdx, colIdx)),
                        "p-1":
                          cell.hasQuestionMark &&
                          mouseIsDown &&
                          isHoveredOn(rowIdx, colIdx),
                        "bg-[#fc0303]": cell.isLosingMine,
                      }
                    )
                  )}
                  onMouseUp={(e) => handleClick(e, rowIdx, colIdx)}
                  onContextMenu={(e) => handleClick(e, rowIdx, colIdx)}
                  onMouseEnter={() => setHoveredCell([rowIdx, colIdx])}
                  onMouseLeave={() => setHoveredCell([-1, -1])}
                >
                  {renderIcon(
                    cell.revealed,
                    cell.hasFlag,
                    cell.hasQuestionMark,
                    cell.value
                  )}
                </div>
                {colIdx === size - 1 && <Border type="right" />}
              </Fragment>
            ))}
          </Fragment>
        ))}
        <TopBottomBorder type="bottom" includeCorner size={size} />
      </div>
    </div>
  )
}
