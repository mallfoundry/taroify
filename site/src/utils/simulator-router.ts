import * as _ from "lodash"
import { navigate } from "gatsby"

const SOURCE_PROPERTY_NAME = "source"
const SIMULATOR_SOURCE_NAME = "taroify-simulator"
const NAVIGATE_TO_EVENT = "navigateTo"

interface Message {
  source: string
  event: string
  payload?: any
}

export function listeningSimulatorEvents() {
  window.addEventListener("message", (event) => {
    const { data } = event
    if (_.isPlainObject(data) && _.has(data, SOURCE_PROPERTY_NAME)
      && _.isEqual(_.get(data, SOURCE_PROPERTY_NAME), SIMULATOR_SOURCE_NAME)) {
      const message = event.data as Message
      if (message.event === NAVIGATE_TO_EVENT) {
        handleSimulatorNavigateTo(message.payload)
      }
    }
  })
}

const COMPONENT_NAMES = [
  "button", "cell", "icon", "image", "layout", "popup", "style", "toast",//
  "backdrop", "loading",
]

function navigateToComponent(component: string) {
  navigate(`/components/${component}`)
}

interface NavigateToOptions {
  component?: string
}

function handleSimulatorNavigateTo(payload: NavigateToOptions) {
  const { component } = payload
  if (component && COMPONENT_NAMES.includes(component)) {
    navigateToComponent(component)
  }
}

