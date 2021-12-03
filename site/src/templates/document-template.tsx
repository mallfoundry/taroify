import { graphql } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode } from "react"
import { Helmet } from "react-helmet"
import Handler from "../components/header"
import SideNav from "../components/side-nav"
import Simulator from "../components/simulator"
import { docsCardWrapper } from "./docs"

interface ComponentTemplateProps {
  children?: ReactNode
  data?: any
}

export default function ComponentTemplate(props: ComponentTemplateProps) {
  const { data } = props
  const post = data.markdownRemark
  const { slug } = post.fields

  return (
    <>
      <Helmet>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </Helmet>
      <div className="vant-docs">
        <Handler />
        <SideNav slug={slug} />
        <div className="vant-docs-container vant-docs-container-with-simulator">
          <div
            className="vant-docs-content"
            dangerouslySetInnerHTML={{ __html: docsCardWrapper(post.html) }}
          />
        </div>
        <Simulator slug={_.startsWith(slug, "/components") ? slug : undefined} />
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query DocumentBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      html
    }
  }
`
