/* eslint-disable react-hooks/rules-of-hooks */
import { graphql, Link } from "gatsby"
import React, { ReactNode, useMemo, useRef, useState } from "react"
// @ts-ignore
import rehypeReact from "rehype-react"
import copy from "copy-to-clipboard";
import { prefixClassname } from "../styles/prefix"

interface ComponentTemplateProps {
  children?: ReactNode
  data?: any
}
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    wrapper: ({ children }: any) => <div className={prefixClassname("docs-card")}>{children}</div>,
    a: ({ href, ...rest }: any) => {
      const noPrefixHref = (href && href.startsWith("/taroify.com")) ? href.replace("/taroify.com", "") : href
      return <Link {...rest} to={noPrefixHref} />
    },
    v: ({ children }: any) => children,
    codeWithCopy: ({ children, ...rest }: any) => {
      const divRef = useRef<HTMLDivElement>()
      const [copied, setCopied] = useState(false);
      const onClickCopy = () => {
        if(copy(divRef.current?.innerText || "")) {
          setCopied(true)
          setTimeout(() => setCopied(false), 1000)
        }
      }
      return <div {...rest} ref={divRef}>
        {
          copied && <div className="copied-tip">Copied!</div>
        }
        <div className="code-copy-btn" onClick={onClickCopy} />
        {children}
      </div>
    },
  }
}).Compiler

export default function ComponentTemplate(props: ComponentTemplateProps) {
  const { data } = props
  const post = data.markdownRemark
  const content = useMemo(() => {
    if (!post.htmlAst.children) {
      return ""
    }
    const oldChildren = post.htmlAst.children.map((item: any) => ({
      ...item,
      tagName: item.properties?.dataLanguage ? "codeWithCopy" : item.tagName
    }))
    const indexes = oldChildren.reduce((acc: { idx:number; tag: string }[], node: any, idx: number) => {
      if (node.tagName === "h3") {
       return acc.concat({ idx, tag: "h3" })
      } else if (node.tagName === "h2") {
        return acc.concat({ idx, tag: "h2" })
      }
      return acc
    }, [])
    if (indexes.length === 0) {
      return ""
    }
    const newChildren = oldChildren.slice(0, indexes[0].idx)
    for (let i = 0, j = indexes.length; i < j; i++) {
      const current = indexes[i]
      if (current.tag === "h3") {
        newChildren.push({
          type: "element",
          tagName: "wrapper",
          children: oldChildren.slice(current.idx, i + 1 >= j ? oldChildren.length : indexes[i + 1].idx)
        })
      } else if (current.tag === "h2") {
        newChildren.push(oldChildren[current.idx])
      }
    }
    return renderAst({
      type: "root",
      children: newChildren,
      data: post.htmlAst.data
    })
  }, [post.htmlAst])
  return (
    <div
      className={prefixClassname("docs-content")}>
        {content}
      </div>
  )
}

export const pageQuery = graphql`
  query DocumentBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      htmlAst
    }
  }
`
