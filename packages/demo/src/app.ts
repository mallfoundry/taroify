import "@taroify/icons/index.scss"
import { ReactNode } from "react"
import "./app.scss"
import "./emulator"

interface AppProps {
  children?: ReactNode
}

function App({ children }: AppProps) {
  return children
}

export default App
