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
    parent.postMessage(message, "*")
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
  return process.env.TARO_ENV === "h5" && parent != window
}
