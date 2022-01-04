import { ReactNode } from "react"
import "./emulator"
import "./app.scss"

interface AppProps {
  children?: ReactNode
}

function App({ children }: AppProps) {
  return children
}

export default App
