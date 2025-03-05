import type { ITouchEvent } from "@tarojs/components"
import { createContext } from "react"
import type { ButtonProps } from "./button"

interface ButtonContextValue {
  onClick?(event: ITouchEvent, props: ButtonProps): void
}

const ButtonContext = createContext<ButtonContextValue>({})

export default ButtonContext
