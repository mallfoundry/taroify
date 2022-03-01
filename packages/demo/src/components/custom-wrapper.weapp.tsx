import { CustomWrapper as TaroCustomWrapper } from "@tarojs/components"
import { ReactNode } from "react"

interface CustomWrapperProps {
  children?: ReactNode
}

function CustomWrapper(props: CustomWrapperProps) {
  return <TaroCustomWrapper {...props} />
}

export default CustomWrapper
