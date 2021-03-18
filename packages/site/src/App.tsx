import * as React from "react"
import "./App.css"
import Button from "vant-taro/button"

function App() {
  console.log("App true")
  const test = false

  if (test) {
    console.log("App false")
  }

  if (false) {
    console.log("App false")
  }
  return (
    <div className="App">
      <Button>dsafkjal</Button>
      <Button>dsafkjal</Button>
      <Button>dsafkjal</Button>
    </div>
  )
}

export default App
