import { ConfigProvider, type ConfigProviderTheme } from "@taroify/core"
import { View } from "@tarojs/components"
import { ReactNode, useEffect, useState } from "react"
import { framedWrapper, listeningThemeChanges, type ThemeMode } from "./utils/framed-router"
import "./app.scss"
import "./emulator"

interface AppProps {
  children?: ReactNode
}

function App({ children }: AppProps) {
  const [themeMode, setThemeMode] = useState<ConfigProviderTheme>(() => {
    if (
      process.env.TARO_ENV === "h5" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ) {
      return "dark"
    }
    return "light"
  })

  useEffect(() => {
    if (process.env.TARO_ENV !== "h5") return

    const handleThemeChange = (nextThemeMode: ThemeMode) => setThemeMode(nextThemeMode)
    if (framedWrapper()) {
      return listeningThemeChanges(handleThemeChange)
    }

    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)")
    if (!mediaQuery) return

    const handleSystemThemeChange = (event: MediaQueryListEvent) =>
      handleThemeChange(event.matches ? "dark" : "light")
    mediaQuery.addEventListener?.("change", handleSystemThemeChange)
    return () => mediaQuery.removeEventListener?.("change", handleSystemThemeChange)
  }, [])

  useEffect(() => {
    if (process.env.TARO_ENV !== "h5") return

    document.documentElement.dataset.taroifyTheme = themeMode
    document.documentElement.style.colorScheme = themeMode
  }, [themeMode])

  if (process.env.TARO_ENV !== "h5") {
    return children
  }

  return (
    <ConfigProvider themeMode={themeMode}>
      <View className="taroify-demo-theme">{children}</View>
    </ConfigProvider>
  )
}

export default App
