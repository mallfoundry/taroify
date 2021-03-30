import { Component } from "react"
import "./app.scss"
import "@taroify/icons/index.scss"
import "@taroify/core/index.scss"

class App extends Component {

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
