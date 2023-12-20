import cls from "classnames";
import { Helmet } from "react-helmet"
import { debounce, startsWith } from "lodash";
import * as React from "react";
import { useState, useEffect } from "react";
import type { PageProps } from "gatsby"
import { prefixClassname } from "../styles/prefix"
import Header from "./header"
import SideNav from "./side-nav";
import Simulator from "./simulator";

type DataProps = {
  markdownRemark: {
    fields: {
      slug: string
    }
  }
}

export default function Layout({ children, data }: PageProps<DataProps>) {
  const { slug } = data.markdownRemark.fields
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
              className={cls(
                prefixClassname("docs-container"),
                prefixClassname("docs-container-with-simulator"),
              )}
            >
              { children }
            </div>
            <Simulator slug={startsWith(slug, "/components") ? slug : undefined} />
          </div>
      }
    </>
  )
}
