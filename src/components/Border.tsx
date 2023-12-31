import clsx from "clsx"

export default function Border({
  type,
}: {
  type:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "left-borderless"
    | "right-borderless"
}) {
  return (
    <div
      className={clsx("bg-[#BDBDBD]", {
        "justify-self-end": type.includes("left"),
        "self-end": type.includes("top"),
        "w-5 border-l-white border-l-4 border-r-[#7B7B7B] border-r-4":
          type === "left" || type === "right",
        "h-5 w-10 border-t-white border-t-4 border-b-[#7B7B7B] border-b-4":
          type === "top" || type === "bottom",
        "h-5 w-5 border-t-white border-t-4 border-l-white border-l-4":
          type === "top-left",
        "h-5 w-5 border-t-white border-t-4 border-r-[#7B7B7B] border-r-4":
          type === "top-right",
        "h-5 w-5 border-b-[#7B7B7B] border-b-4 border-l-white border-l-4":
          type === "bottom-left",
        "h-5 w-5 border-b-[#7B7B7B] border-b-4 border-r-[#7B7B7B] border-r-4":
          type === "bottom-right",
        "w-5 border-l-white border-l-4": type === "left-borderless",
        "w-5 border-r-[#7B7B7B] border-r-4": type === "right-borderless",
      })}
    />
  )
}

export function TopBottomBorder({
  size,
  type,
  includeCorner,
}: {
  size: number
  type: "top" | "bottom"
  includeCorner: boolean
}) {
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
