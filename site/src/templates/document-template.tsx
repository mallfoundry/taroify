import { graphql } from "gatsby"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles/prefix"
import { docsCardWrapper } from "./docs"

interface ComponentTemplateProps {
  children?: ReactNode
  data?: any
}

export default function ComponentTemplate(props: ComponentTemplateProps) {
  const { data } = props
  const post = data.markdownRemark

  return (
    <div
      className={prefixClassname("docs-content")}
      dangerouslySetInnerHTML={{ __html: docsCardWrapper(post.html) }}
    />
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
