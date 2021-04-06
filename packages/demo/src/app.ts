import { ReactNode } from "react"
import "./app.scss"
import "@taroify/icons/index.scss"
import "@taroify/core/index.scss"

interface AppProps {
  children?: ReactNode
}

function App({ children }: AppProps) {
  return children
}

export default App
