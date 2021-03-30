import { Component } from "react"
import "./app.scss"
import "@vant-taro/icons/index.scss"
import "@vant-taro/core/index.scss"

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
