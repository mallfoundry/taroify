import { useEffect, useState } from "react"

export default function useFixed() {
  const [fixed, setFixed] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setFixed(window.scrollY > 64)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => setFixed(window.scrollY > 64), [])

  return fixed
}
