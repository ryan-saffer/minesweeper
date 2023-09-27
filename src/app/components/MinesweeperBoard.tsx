"use client"

import { Fragment, MouseEvent, useEffect, useState } from "react"
import { Minesweeper } from "@minesweeper"
import { clsx } from "clsx"
import Flag from "./icons/Flag"
import Mine from "./icons/Mine"
import NumberIcon from "./icons/NumberIcon"
import IncorrectFlag from "./icons/IncorrectFlag"
import QuestionMark from "./icons/QuestionMark"
import Border from "./Border"
import Header from "./Header"

const size = 18

export default function MinesweeperBoard() {
  const [minesweeper, setMinesweeper] = useState(
    () => new Minesweeper(size, size * 2)
  )
  const [gameState, setGameState] = useState(minesweeper.initialState)

  useEffect(() => {
    const subscription = minesweeper.gameState$.subscribe((state) => {
      setGameState(state)
    })
    return () => subscription.unsubscribe()
  }, [minesweeper])

  const handleClick = (e: MouseEvent, row: number, col: number) => {
    e.preventDefault()

    if (e.type === "click") {
      minesweeper.reveal(row, col)
    }
    if (e.type === "contextmenu") {
      minesweeper.toggleFlag(row, col)
    }
  }

  const reset = () => {
    const minesweeper = new Minesweeper(size, size * 2)
    setMinesweeper(minesweeper)
    setGameState(minesweeper.initialState)
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

  const renderTopBottomBorder = ({
    type,
    includeCorner,
  }: {
    type: "top" | "bottom"
    includeCorner: boolean
  }) => {
    const result = []
    result.push(
      <Border
        key="first"
        type={includeCorner ? `${type}-left` : "left-borderless"}
      />
    )
    for (let i = 0; i < size; i++) {
      result.push(<Border key={i} type={type} />)
    }
    result.push(
      <Border
        key="last"
        type={includeCorner ? `${type}-right` : "right-borderless"}
      />
    )
    return result
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
      {/* <div className=""> */}
      <div
        className="grid w-max mt-[70px] overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${size + 2}, auto)`,
          gridTemplateRows: `repeat(${size + 2}, auto)`,
          // minWidth: 40 + 40 * size,
        }}
      >
        {renderTopBottomBorder({ type: "top", includeCorner: false })}
        {gameState.board.map((row, rowIdx) => (
          <Fragment key={rowIdx}>
            {row.map((cell, colIdx) => (
              <Fragment key={colIdx}>
                {colIdx === 0 && <Border type="left" />}
                <div
                  className={clsx(
                    "bg-[#BDBDBD] w-10 h-10 flex justify-center items-center border border-[#848484] cursor-pointer",
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
        {renderTopBottomBorder({ type: "bottom", includeCorner: true })}
      </div>
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
      {/* </div> */}
    </div>
  )
}
