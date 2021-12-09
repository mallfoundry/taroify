import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER } from "../styles/hairline"
import PaginationContext from "./pagination.context"
import { ItemType, Page as SharedPage } from "./pagination.shared"

function rangePages(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

export function makePageItems(start: number, end: number): ReactElement[] {
  return rangePages(start, end).map((page) => <Pagination.Item key={page} page={page} />)
}

interface PaginationChildren {
  previous?: ReactNode
  startEllipsis?: ReactNode
  items?: ReactNode
  endEllipsis?: ReactNode
  next?: ReactNode
}

interface UsePaginationOptions {
  current: number
  count: number
  siblingCount: number
  children?: ReactNode
}

function usePagination(options: UsePaginationOptions): PaginationChildren {
  const { current, count, siblingCount, children } = options
  const siblingRange = siblingCount * 2 + 1
  let start = Math.max(current - siblingCount, 1)
  let end = start + siblingRange - 1
  if (end > count) {
    end = count
    start = Math.max(end - siblingRange + 1, 1)
  }
  const hasPrevious = current > 1
  const hasStartEllipsis = start > 1
  const hasEndEllipsis = end < count
  const hasNext = current < count

  const items = useMemo(() => makePageItems(start, end), [start, end])

  const __children__: PaginationChildren = {
    previous: undefined,
    startEllipsis: undefined,
    items,
    next: undefined,
  }
  Children.forEach(children, (child: ReactNode) => {
    // Skip is not Item of Pagination
    if (!isValidElement(child)) {
      return
    }

    const element = child as ReactElement
    const elementType = element.type

    if (elementType === Pagination.Item) {
      const { type: itemType } = element.props
      if (itemType === ItemType.Previous && __children__.previous === undefined) {
        __children__.previous = cloneElement(element, { disabled: !hasPrevious })
      } else if (
        itemType === ItemType.StartEllipsis &&
        __children__.startEllipsis === undefined &&
        hasStartEllipsis
      ) {
        __children__.startEllipsis = element
      } else if (itemType === ItemType.EndEllipsis && hasEndEllipsis) {
        __children__.endEllipsis = element
      } else if (itemType === ItemType.Next) {
        __children__.next = cloneElement(element, { disabled: !hasNext })
      }
    }
  })

  if (__children__.previous === undefined) {
    __children__.previous = (
      <Pagination.Item page={Number.MIN_SAFE_INTEGER} type="previous" disabled={!hasPrevious} />
    )
  }
  if (__children__.next === undefined) {
    __children__.next = (
      <Pagination.Item page={Number.MAX_SAFE_INTEGER} type="next" disabled={!hasNext} />
    )
  }

  return __children__
}

interface PaginationProps extends ViewProps {
  className?: string
  current?: number
  count?: number
  siblingCount?: number
  children?: ReactNode
  onChange?: (page: number) => void
}

function Pagination(props: PaginationProps) {
  const {
    className,
    current = 1,
    siblingCount = 2,
    count = 1,
    children,
    onChange,
    ...restProps
  } = props
  const { previous, startEllipsis, items, endEllipsis, next } = usePagination({
    current,
    siblingCount,
    count,
    children,
  })

  function emitClick(page: Pagination.Page) {
    const { page: pageNumber } = page
    const siblingRange = siblingCount * 2 + 1
    if (page.type === ItemType.Previous) {
      onChange?.(Math.max(current - 1, 1))
    } else if (page.type === ItemType.StartEllipsis) {
      onChange?.(Math.max(current - siblingRange, 1))
    } else if (page.type === ItemType.Page) {
      onChange?.(pageNumber)
    } else if (page.type === ItemType.EndEllipsis) {
      onChange?.(Math.min(current + siblingRange, count))
    } else if (page.type === ItemType.Next) {
      onChange?.(Math.min(current + 1, count))
    }
  }

  return (
    <View className={classNames(prefixClassname("pagination"), className)} {...restProps}>
      <PaginationContext.Provider
        value={{
          current,
          count,
          siblingCount,
          emitClick,
        }}
      >
        {previous}
        {startEllipsis}
        {items}
        {endEllipsis}
        {next}
      </PaginationContext.Provider>
    </View>
  )
}

namespace Pagination {
  export type Page = SharedPage

  interface BaseItemProps {
    className?: string
    style?: CSSProperties
    hidden?: boolean
    disabled?: boolean
    children?: ReactNode
    onClick?: () => void
  }

  function BaseItem(props: BaseItemProps) {
    const { className, style, hidden, disabled, children, onClick } = props
    return (
      <View
        className={classNames(
          prefixClassname("pagination__item"),
          HAIRLINE_BORDER,
          {
            [prefixClassname("pagination__item--disabled")]: disabled,
            [prefixClassname("pagination__item--hidden")]: hidden,
          },
          className,
        )}
        style={style}
        children={children}
        onClick={onClick}
      />
    )
  }

  type ItemTypeString =
    | "page"
    | "first"
    | "last"
    | "previous"
    | "next"
    | "start-ellipsis"
    | "end-ellipsis"

  interface ItemProps extends BaseItemProps {
    type?: ItemType | ItemTypeString
    page?: number
  }

  export function Item(props: ItemProps) {
    const {
      className,
      page = 0,
      type = ItemType.Page,
      disabled = false,
      children,
      onClick,
      ...restProps
    } = props
    const { current, emitClick } = useContext(PaginationContext)
    const active = page === current

    function renderChildren() {
      let __children__ = children
      if (__children__ === undefined) {
        if (type === ItemType.Previous) {
          __children__ = "上一页"
        } else if (type === ItemType.StartEllipsis || type === ItemType.EndEllipsis) {
          __children__ = "..."
        } else if (type === ItemType.Next) {
          __children__ = "下一页"
        } else if (type === ItemType.Page) {
          __children__ = page
        }
      }
      return __children__
    }

    return (
      <BaseItem
        className={classNames(
          {
            [prefixClassname("pagination__item--active")]: !disabled && active,
            [prefixClassname("pagination__page")]: type === ItemType.Page,
            [prefixClassname("pagination__start-ellipsis")]: type === ItemType.StartEllipsis,
            [prefixClassname("pagination__end-ellipsis")]: type === ItemType.EndEllipsis,
            [prefixClassname("pagination__button")]: type === ItemType.Previous || ItemType.Next,
          },
          className,
        )}
        disabled={disabled && !active}
        children={renderChildren()}
        onClick={() => emitClick?.({ page, type: type as ItemType })}
        {...restProps}
      />
    )
  }
}

export default Pagination
