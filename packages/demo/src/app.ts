import { ReactNode } from "react"
import "@taroify/icons/index.scss"
import "./app.scss"
import "./emulator"

interface AppProps {
  children?: ReactNode
}

function App({ children }: AppProps) {
  return children
}

export default App
