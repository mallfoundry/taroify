import classNames from "classnames"
import { graphql } from "gatsby"
import { startsWith, debounce } from "lodash"
import * as React from "react"
import { useEffect, useState } from "react"
import { ReactNode } from "react"
import { Helmet } from "react-helmet"
import Header from "../components/header"
import SideNav from "../components/side-nav"
import Simulator from "../components/simulator"
import { prefixClassname } from "../styles/prefix"
import { docsCardWrapper } from "./docs"

interface ComponentTemplateProps {
  children?: ReactNode
  data?: any
}

export default function ComponentTemplate(props: ComponentTemplateProps) {
  const { data } = props
  const post = data.markdownRemark
  const { slug } = post.fields
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined)
  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(document.documentElement.clientWidth < 576)
    }, 100, {
      leading: true,
    })
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (isMobile === undefined) {
    return null
  }

  return (
    <>
      <Helmet>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Helmet>
      {
        isMobile ?
          <Simulator slug={startsWith(slug, "/components") ? slug : undefined} isMobile /> :
          <div className={prefixClassname("docs")}>
            <Header />
            <SideNav slug={slug} />
            <div
              className={classNames(
                prefixClassname("docs-container"),
                prefixClassname("docs-container-with-simulator"),
              )}
            >
              <div
                className={prefixClassname("docs-content")}
                dangerouslySetInnerHTML={{ __html: docsCardWrapper(post.html) }}
              />
            </div>
            <Simulator slug={startsWith(slug, "/components") ? slug : undefined} />
          </div>
      }
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
