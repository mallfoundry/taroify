import * as React from "react"
import "./header.scss"

export default function Handler() {
  return (
    <header className="vant-header">
      <div className="vant-header-top">
        <div className="vant-header-logo">
          <img src="https://img01.yzcdn.cn/vant/logo.png" alt="vant logo" />
          <span>Vant Taro</span>
        </div>
      </div>
    </header>
  )
}
