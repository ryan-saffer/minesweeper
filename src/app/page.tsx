"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center pt-8 p-2 md:p-8">
      <h1 className="font-serif text-center text-2xl font-bold md:text-6xl">
        *** Minesweeper ***
      </h1>
      <h2 className="font-serif text-center text-xl md:text-3xl pt-4">
        A clone of the classic Microsoft game.
      </h2>
      <p className="font-serif text-center text-l md:text-xl pt-4">
        Choose a difficulty to play:
      </p>
      <Level name="Easy" size={7} mines={8} />
      <Level name="Medium" size={15} mines={50} />
      <Level name="Hard" size={26} mines={170} />
    </div>
  )
}

function Level({
  name,
  size,
  mines,
}: {
  name: string
  size: number
  mines: number
}) {
  return (
    <Link
      className="h-20 w-40 md:w-60 p-8 md:p-12 mt-4 flex flex-col justify-center items-center bg-[#BDBDBD] border border-[#848484] cursor-pointer active:border-b-white active:border-b-4 active:border-r-white active:border-r-4 active:border-t-[#7B7B7B] active:border-t-4 active:border-l-[#7B7B7B] active:border-l-4 border-t-white border-t-4 border-l-white border-l-4 border-b-[#7B7B7B] border-b-4 border-r-[#7B7B7B] border-r-4"
      href={`/${name.toLowerCase()}`}
    >
      <h3 className="font-serif text-2xl md:text-4xl">{name}</h3>
      <p className="font-serif text-sm md:text-lg w-max">{`${size}x${size} - ${mines} mines`}</p>
    </Link>
  )
}
