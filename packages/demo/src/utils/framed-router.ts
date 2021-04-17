interface Message {
  source: string
  event: string
  payload?: any
}

const SOURCE_NAME = "taroify-simulator"

const NAVIGATE_BACK_MESSAGE: Message = {
  source: SOURCE_NAME,
  event: "navigateBack",
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
      event: "navigateTo",
      payload: { component },
    })
  }
}

export function navigateBack() {
  sendMessage(NAVIGATE_BACK_MESSAGE)
}

export function framedWrapper() {
  /* eslint-disable no-restricted-globals */
  return process.env.TARO_ENV === "h5" && parent != window
  /* eslint-enable no-restricted-globals */
}
