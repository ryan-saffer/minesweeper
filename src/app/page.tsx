"use client"

import dynamic from "next/dynamic"

const NoSSR = dynamic(() => import("./components/MinesweeperBoard"), {
  ssr: false,
})

export default function Home() {
  return <NoSSR />
}
