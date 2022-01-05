import { ReactNode } from "react"

interface CustomWrapperProps {
  children?: ReactNode
}

function CustomWrapper(props: CustomWrapperProps) {
  return props.children as JSX.Element
}

export default CustomWrapper
