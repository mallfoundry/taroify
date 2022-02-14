import { prefixClassname } from "../styles/prefix"

export function docsCardWrapper(html: string) {
  const group = html.replace(/<h3/g, ":::<h3").replace(/<h2/g, ":::<h2").split(":::")

  return group
    .map((fragment: string) => {
      if (fragment.indexOf("<h3") !== -1) {
        return `<div class="${prefixClassname("docs-card")}">${fragment}</div>`
      }
      return fragment
    })
    .join("")
}
