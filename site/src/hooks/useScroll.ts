import { useEffect, useState } from "react"

export default function useScroll() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setX(window.scrollX)
      setY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setX(window.scrollX)
    setY(window.scrollY)
  }, [])

  return {
    x,
    y,
  }
}
