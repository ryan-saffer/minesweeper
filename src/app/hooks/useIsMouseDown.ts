import { useCallback, useEffect, useState } from "react"

export default function useIsMouseDown() {
  const [mouseIsDown, setMouseIsDown] = useState(false)

  const handleMouseDown = useCallback(() => {
    setMouseIsDown(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setMouseIsDown(false)
  }, [])

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("contextmenu", handleMouseUp)

    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseDown, handleMouseUp])

  return mouseIsDown
}
