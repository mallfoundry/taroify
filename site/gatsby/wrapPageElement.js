// eslint-disable-next-line no-use-before-define
import * as React from "react"
import Layout from "../src/components/layout"

const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export default wrapPageElement
