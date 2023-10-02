import { useEffect, useMemo, useState } from "react"

export default function useSound() {
  // Audio() is not recognised server side, so only use it once on client
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const pop = useMemo(() => {
    if (!isClient) return
    const audio = new Audio("/sounds/pop.wav")
    audio.volume = 0.4
    return audio
  }, [isClient])

  const flag = useMemo(() => {
    if (!isClient) return
    const audio = new Audio("/sounds/flag.wav")
    audio.volume = 1
    return audio
  }, [isClient])

  const shuffle = useMemo(() => {
    if (!isClient) return
    const audio = new Audio("/sounds/shuffle.wav")
    audio.volume = 0.8
    return audio
  }, [isClient])

  const bomb = useMemo(() => {
    if (!isClient) return
    const audio = new Audio("/sounds/bomb.wav")
    audio.volume = 0.5
    return audio
  }, [isClient])

  const ding = useMemo(() => {
    if (!isClient) return
    const audio = new Audio("/sounds/ding.wav")
    audio.volume = 0.5
    return audio
  }, [isClient])

  const win = useMemo(() => {
    if (!isClient) return
    const audio = new Audio("/sounds/win.wav")
    audio.volume = 0.5
    return audio
  }, [isClient])

  return isClient
    ? [
        () => pop!.play(),
        () => flag!.play(),
        () => shuffle!.play(),
        () => bomb!.play(),
        () => ding!.play(),
        () => win!.play(),
      ]
    : []
}
