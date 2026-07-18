import type { ThemeMode } from "../hooks/useTheme"

export const SITE_SOURCE_NAME = "taroify-site"
export const THEME_CHANGE_EVENT = "themeChange"
export const SIMULATOR_READY_EVENT = "ready"

export interface ThemeChangeMessage {
  source: typeof SITE_SOURCE_NAME
  event: typeof THEME_CHANGE_EVENT
  payload: {
    themeMode: ThemeMode
  }
}

export function createThemeChangeMessage(themeMode: ThemeMode): ThemeChangeMessage {
  return {
    source: SITE_SOURCE_NAME,
    event: THEME_CHANGE_EVENT,
    payload: { themeMode },
  }
}

export function sendThemeChange(target: Window | null, themeMode: ThemeMode) {
  target?.postMessage(createThemeChangeMessage(themeMode), "*")
}
