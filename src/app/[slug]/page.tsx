import MinesweeperBoard from "../../components/MinesweeperBoard"

export default function Page({
  params,
}: {
  params: { slug: "easy" | "medium" | "hard" }
}) {
  switch (params.slug) {
    case "easy":
      return <MinesweeperBoard size={7} mines={8} />
    case "medium":
      return <MinesweeperBoard size={15} mines={50} />
    case "hard":
      return <MinesweeperBoard size={26} mines={170} />
  }
}
