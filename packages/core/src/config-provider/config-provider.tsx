import { View } from "@tarojs/components"
import * as _ from "lodash"
import * as React from "react"
import { type CSSProperties, type ReactNode, useMemo } from "react"
import type { ConfigProviderTheme, ConfigProviderThemeVars } from "./config-provider.shared"
import darkThemeVars from "./config-provider.theme"

function convertThemeVarsToCSSVars(themeVars: ConfigProviderThemeVars) {
  const cssVars: Record<string, string | number> = {}
  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--${_.kebabCase(key)}`] = themeVars[key as keyof ConfigProviderThemeVars] as
      | string
      | number
  })
  return cssVars
}

export interface ConfigProviderProps {
  theme?: ConfigProviderThemeVars
  themeMode?: ConfigProviderTheme
  children?: ReactNode
}

function ConfigProvider(props: ConfigProviderProps) {
  const { theme = {}, themeMode = "light", children } = props
  const style = useMemo<CSSProperties>(
    () => ({
      colorScheme: themeMode,
      ...convertThemeVarsToCSSVars(themeMode === "dark" ? { ...darkThemeVars, ...theme } : theme),
    }),
    [theme, themeMode],
  )
  return <View style={style} children={children} />
}

export default ConfigProvider
