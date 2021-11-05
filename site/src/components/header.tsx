import * as React from "react"
import gitee from "./gitee.svg"
import github from "./github.svg"
import react from "./react.svg"
import "./header.scss"

export default function Handler() {
  return (
    <header className="van-header">
      <div className="van-header__top">
        <div className="van-header__logo">
          <img src="https://img01.yzcdn.cn/vant/logo.png" alt="taroify logo" />
          <span>Taroify</span>
        </div>
        <ul className="van-header__top-nav">
          <li className="van-header__top-nav-item">
            <a href="https://github.com/3lang3/react-vant/">
              <img src={react} alt="Vant React" />
            </a>
          </li>
          <li className="van-header__top-nav-item">
            <a href="https://gitee.com/mallfoundry/taroify/">
              <img src={gitee} alt="" />
            </a>
          </li>
          <li className="van-header__top-nav-item">
            <a href="https://github.com/mallfoundry/taroify/">
              <img src={github} alt="" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
