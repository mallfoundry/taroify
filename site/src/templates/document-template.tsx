import * as React from "react"
import * as _ from "lodash"
import { ReactNode } from "react"
import Handler from "../components/header"
import SideNav from "../components/side-nav"
import { graphql } from "gatsby"
import { docsCardWrapper } from "./docs"
import Simulator from "../components/simulator"

interface ComponentTemplateProps {
  children?: ReactNode
  data?: any
}

export default function ComponentTemplate(props: ComponentTemplateProps) {
  const { data } = props
  const post = data.markdownRemark
  const { slug } = post.fields

  return (
    <div className="vant-docs">
      <Handler />
      <SideNav slug={slug} />
      <div className="vant-docs-container vant-docs-container-with-simulator">
        <div className="vant-docs-content" dangerouslySetInnerHTML={{ __html: docsCardWrapper(post.html) }} />
      </div>
      <Simulator slug={_.startsWith(slug, "/components") ? slug : undefined} />
    </div>
  )
}

export const pageQuery = graphql`
    query DocumentBySlug($slug: String!) {
      markdownRemark(fields: {slug: {eq: $slug}}) {
        id
        fields {
          slug
        }
        html
      }
    }
`
