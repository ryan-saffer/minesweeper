import clsx from "clsx"
import Border, { TopBottomBorder } from "./Border"
import NumberDisplay from "./NumberDisplay"
import FaceGlasses from "./icons/FaceGlasses"
import FaceSad from "./icons/FaceSad"
import FaceSmile from "./icons/FaceSmile"

export default function Header({
  size,
  time,
  flagsLeft,
  face,
  reset,
}: {
  size: number
  time: number
  flagsLeft: number
  face: "happy" | "sad" | "sunglasses"
  reset: () => void
}) {
  // const minWidth = 40 + 40 * size
  return (
    <div
      className={"grid fixed top-0"}
      style={{
        gridTemplateColumns: `20px repeat(${size}, minmax(0, 40px)) 20px`,
      }}
    >
      <TopBottomBorder size={size} type="top" includeCorner />
      <Border type="left" />
      <div
        className="bg-[#C0C0C0] flex justify-between items-center px-2"
        style={{ gridColumnStart: 2, gridColumnEnd: size + 2 }}
      >
        <NumberDisplay value={flagsLeft} />
        <div
          className="bg-[#BDBDBD] h-10 w-10 aspect-square flex justify-center border border-[#848484] border-t-white border-t-4 border-l-white border-l-4 border-b-[#7B7B7B] border-b-4 border-r-[#7B7B7B] border-r-4 cursor-pointer relative"
          onClick={reset}
        >
          {face === "happy" ? (
            <FaceSmile />
          ) : face === "sad" ? (
            <FaceSad />
          ) : (
            <FaceGlasses />
          )}
        </div>
        <NumberDisplay value={time} />
      </div>
      <Border type="right" />
    </div>
  )
}
