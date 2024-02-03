import * as React from "react"
import { DocSearch } from "@docsearch/react";
import { prefixClassname } from "../styles/prefix"
import "./header.scss"
import github from "./github.svg"
import react from "./react.svg"

export default function Header() {
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <header className={prefixClassname("header")}>
      <div className={prefixClassname("header__top")}>
        <div className={prefixClassname("header__logo")}>
          <img src="https://img01.yzcdn.cn/vant/logo.png" alt="taroify logo" />
          <span>Taroify</span>
        </div>
        {
          isMounted && <DocSearch
            appId="PAKMKX78PV"
            apiKey="974bc581b9fecf6765c93db8dacdc1fa"
            indexName="taroify-com"
          />
        }
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
