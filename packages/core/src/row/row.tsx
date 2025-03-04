import * as React from "react"
import Flex from "../flex"
import type { FlexProps } from "../flex"

function Row(props: FlexProps) {
  console.warn("[Deprecated] The Row component is deprecated. Please use the Flex component.")
  return <Flex {...props} />
}

export default Row
