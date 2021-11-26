import * as React from "react"
import Flex from "../flex"
import { FlexProps } from "../flex"

function Row(props: FlexProps) {
  // eslint-disable-next-line no-console
  console.warn("[Deprecated] The Row component is deprecated. Please use the Flex component.")
  return <Flex {...props} />
}

export default Row
