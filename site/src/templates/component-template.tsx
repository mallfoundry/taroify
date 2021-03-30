import * as React from "react"
import { ReactNode } from "react"
import Handler from "../components/header"
import SideNav from "../components/side-nav"
import Simulator from "../components/simulator"
import { graphql } from "gatsby"
import { docsCardWrapper } from "./docs"

interface ComponentTemplateProps {
  children?: ReactNode
  data?: any
}

export default function ComponentTemplate(props: ComponentTemplateProps) {
  const { data } = props
  const post = data.markdownRemark
  return (
    <div className="vant-docs">
      <Handler />
      <SideNav />
      <div className="vant-docs-container vant-docs-container-with-simulator">
        <div className="vant-docs-content" dangerouslySetInnerHTML={{ __html: docsCardWrapper(post.html) }} />
      </div>
      <Simulator />
    </div>
  )
}

export const pageQuery = graphql`
    query ComponentBySlug($slug: String!) {
      markdownRemark(fields: {slug: {eq: $slug}}) {
        id
        fields {
          slug
        }
        html
      }
    }
`
