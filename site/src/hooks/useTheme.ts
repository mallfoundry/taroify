import { useCallback, useEffect, useState } from "react"

export type ThemeMode = "light" | "dark"

export const THEME_STORAGE_KEY = "taroify.themeMode"

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark"
}

function getStoredThemeMode() {
  try {
    const themeMode = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeMode(themeMode) ? themeMode : undefined
  } catch {
    return undefined
  }
}

function getSystemThemeMode(): ThemeMode {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyThemeMode(themeMode: ThemeMode) {
  const root = document.documentElement
  root.classList.toggle("dark", themeMode === "dark")
  root.dataset.theme = themeMode
  root.style.colorScheme = themeMode
}

export default function useTheme() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")

  useEffect(() => {
    const preferredThemeMode = getStoredThemeMode() ?? getSystemThemeMode()
    setThemeMode(preferredThemeMode)
    applyThemeMode(preferredThemeMode)

    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)")
    if (!mediaQuery) return

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (getStoredThemeMode()) return

      const nextThemeMode = event.matches ? "dark" : "light"
      setThemeMode(nextThemeMode)
      applyThemeMode(nextThemeMode)
    }

    mediaQuery.addEventListener?.("change", handleSystemThemeChange)
    return () => mediaQuery.removeEventListener?.("change", handleSystemThemeChange)
  }, [])

  const toggleThemeMode = useCallback(() => {
    setThemeMode((currentThemeMode) => {
      const nextThemeMode = currentThemeMode === "dark" ? "light" : "dark"
      applyThemeMode(nextThemeMode)
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextThemeMode)
      } catch {
        // Ignore storage failures and keep the theme for the current page.
      }
      return nextThemeMode
    })
  }, [])

  return { themeMode, toggleThemeMode }
}
