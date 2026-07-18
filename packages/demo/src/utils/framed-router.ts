interface Message {
  source: string
  event: string
  payload?: any
}

const SOURCE_NAME = "taroify-simulator"
const SITE_SOURCE_NAME = "taroify-site"
const NAVIGATE_TO_EVENT = "navigateTo"
const NAVIGATE_BACK_EVENT = "navigateBack"
const THEME_CHANGE_EVENT = "themeChange"
const READY_EVENT = "ready"

const NAVIGATE_BACK_MESSAGE: Message = {
  source: SOURCE_NAME,
  event: NAVIGATE_BACK_EVENT,
}

function sendMessage(message: Message) {
  if (framedWrapper()) {
    /* eslint-disable no-restricted-globals */
    parent.postMessage(message, "*")
    /* eslint-enable no-restricted-globals */
  }
}

interface NavigateOptions {
  component: string
}

export function navigateTo({ component }: NavigateOptions) {
  if (component) {
    sendMessage({
      source: SOURCE_NAME,
      event: NAVIGATE_TO_EVENT,
      payload: { component },
    })
  }
}

export function navigateBack() {
  sendMessage(NAVIGATE_BACK_MESSAGE)
}

export type ThemeMode = "light" | "dark"

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark"
}

export function listeningThemeChanges(onThemeChange: (themeMode: ThemeMode) => void) {
  if (!framedWrapper()) return () => {}

  const messageHandler = (event: MessageEvent) => {
    /* eslint-disable no-restricted-globals */
    if (event.source !== parent) return
    /* eslint-enable no-restricted-globals */

    const message = event.data as Message
    if (
      message?.source === SITE_SOURCE_NAME &&
      message.event === THEME_CHANGE_EVENT &&
      isThemeMode(message.payload?.themeMode)
    ) {
      onThemeChange(message.payload.themeMode)
    }
  }

  window.addEventListener("message", messageHandler)
  sendMessage({ source: SOURCE_NAME, event: READY_EVENT })
  return () => window.removeEventListener("message", messageHandler)
}

export function framedWrapper() {
  /* eslint-disable no-restricted-globals */
  return process.env.TARO_ENV === "h5" && parent != window
  /* eslint-enable no-restricted-globals */
}
