import * as React from "react"
import { DocSearch } from "@docsearch/react";
import type { ThemeMode } from "../hooks/useTheme"
import { prefixClassname } from "../styles/prefix"
import "./header.scss"
import github from "./github.svg"
import react from "./react.svg"

interface HeaderProps {
  themeMode: ThemeMode
  onThemeChange(): void
}

function ThemeIcon({ themeMode }: { themeMode: ThemeMode }) {
  return themeMode === "dark" ? (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.35 15.35A9 9 0 0 1 8.65 3.65a9 9 0 1 0 11.7 11.7Z" />
    </svg>
  )
}

export default function Header({ themeMode, onThemeChange }: HeaderProps) {
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
            <button
              type="button"
              className={prefixClassname("header__theme-toggle")}
              aria-label={themeMode === "dark" ? "切换到浅色模式" : "切换到暗色模式"}
              title={themeMode === "dark" ? "切换到浅色模式" : "切换到暗色模式"}
              onClick={onThemeChange}
            >
              <ThemeIcon themeMode={themeMode} />
            </button>
          </li>
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
