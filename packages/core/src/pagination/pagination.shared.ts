export enum ItemType {
  Page = "page",
  First = "first",
  Last = "last",
  Previous = "previous",
  Next = "next",
  StartEllipsis = "start-ellipsis",
  EndEllipsis = "end-ellipsis",
}

export interface Page {
  page: number
  type?: ItemType
}

export type PaginationThemeVars = {
  paginationHeight?: string
  paginationFontSize?: string
  paginationBackgroundColor?: string
  paginationItemMinWidth?: string
  paginationItemColor?: string
  paginationItemActiveColor?: string
  paginationItemActiveBackgroundColor?: string
  paginationItemDisabledColor?: string
  paginationItemDisabledBackgroundColor?: string
  paginationItemDisabledOpacity?: string
  paginationButtonPadding?: string
}
