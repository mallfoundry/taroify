import { View } from "@tarojs/components"
import * as _ from "lodash"
import * as React from "react"
import { type CSSProperties, type ReactNode, useMemo } from "react"

function convertThemeVarsToCSSVars(themeVars: Record<string, string | number>) {
  const cssVars: Record<string, string | number> = {}
  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--${_.kebabCase(key)}`] = themeVars[key]
  })
  return cssVars
}

interface ConfigProviderProps {
  theme?: Record<string, string | number>
  children?: ReactNode
}

function ConfigProvider(props: ConfigProviderProps) {
  const { theme = {}, children } = props
  const style = useMemo<CSSProperties | undefined>(() => convertThemeVarsToCSSVars(theme), [theme])
  return <View style={style} children={children} />
}

export default ConfigProvider
