import * as React from "react"
import Flex, { type FlexItemProps } from "../flex"

function Col(props: FlexItemProps) {
  console.warn("[Deprecated] The Col component is deprecated. Please use the Flex.Item component.")
  return <Flex.Item {...props} />
}

export default Col
