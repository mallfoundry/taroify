import * as React from "react"
import Flex, { FlexItemProps } from "../flex"

function Col(props: FlexItemProps) {
  // eslint-disable-next-line no-console
  console.warn("[Deprecated] The Col component is deprecated. Please use the Flex.Item component.")
  return <Flex.Item {...props} />
}

export default Col
