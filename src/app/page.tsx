"use client"

import dynamic from "next/dynamic"

const Minesweeper = dynamic(() => import("./components/MinesweeperBoard"), {
  ssr: false,
})

export default function Home() {
  return <Minesweeper />
}
