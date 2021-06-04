import { ItemType, Page } from "./pagination.shared"

export function makePages(count: number): Page[] {
  const range = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
  }

  return range(1, count).map((page) => ({
    page,
    type: ItemType.Page,
  }))
}

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

  const pageItems = makePages(count)

  const items: Page[] = [
    {
      page: Number.MIN_SAFE_INTEGER,
      type: ItemType.Previous,
    },
    ...pageItems,
    {
      page: Number.MAX_SAFE_INTEGER,
      type: ItemType.Next,
    },
  ]

  return {
    hasPrevious,
    hasNext,
    count,
    items,
  }
}
