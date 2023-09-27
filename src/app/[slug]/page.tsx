import dynamic from "next/dynamic"

const Minesweeper = dynamic(() => import("../../components/MinesweeperBoard"), {
  ssr: false,
})

export default function Page({
  params,
}: {
  params: { slug: "easy" | "medium" | "hard" }
}) {
  switch (params.slug) {
    case "easy":
      return <Minesweeper size={7} mines={8} />
    case "medium":
      return <Minesweeper size={15} mines={50} />
    case "hard":
      return <Minesweeper size={26} mines={170} />
  }
}
