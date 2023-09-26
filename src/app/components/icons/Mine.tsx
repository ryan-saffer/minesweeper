import Image from "next/image"

export default function Mine() {
  return (
    <Image
      loading="eager"
      src="/mine.png"
      className="h-7 w-7"
      alt="mine"
      width={10}
      height={10}
    />
  )
}
