import { navigate } from "gatsby"
import * as _ from "lodash"

import menus from "./menus"

const SOURCE_PROPERTY_NAME = "source"
const SIMULATOR_SOURCE_NAME = "taroify-simulator"
const NAVIGATE_TO_EVENT = "navigateTo"
const NAVIGATE_BACK_EVENT = "navigateBack"

function obtainComponentNames() {
  const componentNames: string[] = []
  for (const { children } of menus) {
    for (const { to } of children) {
      if (_.startsWith(to, "/components/")) {
        let componentName = _.replace(to, "/components/", "") // "/components/button-group/" to "button-group/"
        componentName = _.replace(componentName, "/", "") // "button-group/" to "button-group"
        componentName = _.camelCase(componentName) // "button-group" to "buttonGroup"
        componentName = _.upperFirst(componentName) // "buttonGroup" to "ButtonGroup"
        componentNames.push(componentName)
      }
    }
  }
  return componentNames
}

const COMPONENT_NAMES = obtainComponentNames()

interface Message {
  source: string
  event: string
  payload?: any
}

export function listeningSimulatorEvents() {
  function messageHandler(event: MessageEvent) {
    const { data } = event
    if (
      _.isPlainObject(data) &&
      _.has(data, SOURCE_PROPERTY_NAME) &&
      _.isEqual(_.get(data, SOURCE_PROPERTY_NAME), SIMULATOR_SOURCE_NAME)
    ) {
      const message = event.data as Message
      if (message.event === NAVIGATE_TO_EVENT) {
        handleSimulatorNavigateTo(message.payload)
      } else if (message.event === NAVIGATE_BACK_EVENT) {
        handleSimulatorNavigateBack()
      }
    }
  }
  window.addEventListener("message", messageHandler)
  return () => window.removeEventListener("message", messageHandler)
}

function navigateToComponent(component: string) {
  navigate(`/components/${component}`)
}

function handleSimulatorNavigateBack() {
  navigate("/introduce")
}

interface NavigateToOptions {
  component?: string
}

function handleSimulatorNavigateTo(payload: NavigateToOptions) {
  const { component } = payload
  if (component && COMPONENT_NAMES.includes(component)) {
    navigateToComponent(_.kebabCase(component))
  }
}
