import * as React from "react"
import { DocSearch } from "@docsearch/react"
import { prefixClassname } from "../styles/prefix"
import github from "./github.svg"
import "./header.scss"
import react from "./react.svg"

export default function Handler() {
  return (
    <header className={prefixClassname("header")}>
      <div className={prefixClassname("header__top")}>
        <div className={prefixClassname("header__logo")}>
          <img src="https://img01.yzcdn.cn/vant/logo.png" alt="taroify logo" />
          <span>Taroify</span>
        </div>
        <DocSearch
          appId="R2IYF7ETH7"
          apiKey="599cec31baffa4868cae4e79f180729b"
          indexName="docsearch"
        />
        <ul className={prefixClassname("header__top-nav")}>
          <li className={prefixClassname("header__top-nav-item")}>
            <a href="https://github.com/3lang3/react-vant/">
              <img src={react} alt="Vant React" />
            </a>
          </li>
          <li className={prefixClassname("header__top-nav-item")}>
            <a href="https://github.com/mallfoundry/taroify/">
              <img src={github} alt="" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
