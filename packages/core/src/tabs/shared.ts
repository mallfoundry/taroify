import { prefixClassname } from "../styles"

export enum TabsTheme {
  Line = "line",
  Card = "card",
}

export type TabsThemeString = "line" | "card"

export type TabKey = string | number | undefined

const TAB_INDEX_PREFIX_CLASSNAME = prefixClassname("tabs__tab--index-")

export function tabIndexClassname(dataIndex?: number) {
  return `${TAB_INDEX_PREFIX_CLASSNAME}${dataIndex}`
}
