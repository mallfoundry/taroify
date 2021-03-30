import {useEffect, useState} from "react";

export default function useScroll() {
    const [position, setPosition] = useState({x: 0, y: 0})
    useEffect(() => {
        function handleScroll() {
            setPosition({
                ...position,
                y: window.scrollY
            })
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return {
        position
    }
}
