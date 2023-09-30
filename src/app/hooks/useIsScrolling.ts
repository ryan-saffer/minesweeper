import { useCallback, useEffect, useRef, useState } from "react"

export default function useIsScrolling() {
  const [isScrolling, setIsScrolling] = useState(false)
  const timeout = useRef<NodeJS.Timeout | undefined>(undefined)

  const handleScroll = useCallback(() => {
    setIsScrolling(true)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setIsScrolling(false)
    }, 200)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return isScrolling
}
