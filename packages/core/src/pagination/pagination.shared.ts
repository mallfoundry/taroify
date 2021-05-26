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
