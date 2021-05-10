import { ItemType, Page } from "./shared"

interface UsePaginationOptions {
  current?: number
  limit?: number
  total?: number
}

interface UsePagination {
  hasPrevious?: boolean
  hasNext?: boolean
  count?: number
  items?: Page[]
}

export function usePagination(options?: UsePaginationOptions): UsePagination {
  const { current = 1, limit = 10, total = 60 } = options ?? {}

  const count = Math.ceil(total / limit)
  const hasPrevious = current > 1
  const hasNext = current < count

  const range = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
  }

  const pages = range(1, count)
  const pageItems: Page[] = pages.map((page) => ({
    page,
    type: ItemType.Page,
  }))

  const items = [
    {
      type: ItemType.Previous,
      page: "上一页",
      disabled: !hasPrevious,
    },
    ...pageItems,
    {
      type: ItemType.Next,
      page: "下一页",
      disabled: !hasNext,
    },
  ]

  return {
    hasPrevious,
    hasNext,
    count,
    items,
  }
}
