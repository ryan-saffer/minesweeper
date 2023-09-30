import clsx from "clsx"
import Border, { TopBottomBorder } from "./Border"
import NumberDisplay from "./NumberDisplay"
import FaceGlasses from "./icons/FaceGlasses"
import FaceSad from "./icons/FaceSad"
import FaceSmile from "./icons/FaceSmile"
import useIsMouseDown from "../app/hooks/useIsMouseDown"
import { twMerge } from "tw-merge"
import { useState } from "react"
import FaceSurprised from "./icons/FaceSuprised"
import useIsScrolling from "../app/hooks/useIsScrolling"

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
  const mouseIsDown = useIsMouseDown()
  const isScrolling = useIsScrolling()
  const [isHoveredOn, setIsHoveredOn] = useState(false)

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
          className={twMerge(
            clsx(
              "bg-[#BDBDBD] h-10 w-10 aspect-square flex justify-center border border-[#848484] border-t-white border-t-4 border-l-white border-l-4 border-b-[#7B7B7B] border-b-4 border-r-[#7B7B7B] border-r-4 cursor-pointer relative",
              {
                "border border-b-white border--4 border-r-white border-r-4 border-t-[#7B7B7B] border-t-4 border-l-[#7B7B7B] border-l-4":
                  isHoveredOn && mouseIsDown,
              }
            )
          )}
          onMouseUp={reset}
          onMouseEnter={() => setIsHoveredOn(true)}
          onMouseLeave={() => setIsHoveredOn(false)}
        >
          {face === "sunglasses" ? (
            <FaceGlasses />
          ) : face === "sad" ? (
            <FaceSad />
          ) : mouseIsDown || isScrolling ? (
            <FaceSurprised />
          ) : (
            <FaceSmile />
          )}
        </div>
        <NumberDisplay value={time} />
      </div>
      <Border type="right" />
    </div>
  )
}
