import { useUncontrolled } from "@taroify/hooks"
import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import { getWindowInfo, usePageScroll } from "@tarojs/taro"
import classnames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Key,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
} from "react"
import { useMounted } from "../hooks"
import { prefixClassname } from "../styles"
import { getRect } from "../utils/dom/rect"
import DropdownMenuItem, { type DropdownMenuItemProps } from "./dropdown-menu-item"
import DropdownMenuOption, { type DropdownMenuOptionProps } from "./dropdown-menu-option"
import DropdownMenuTitle from "./dropdown-menu-title"
import DropdownMenuContext from "./dropdown-menu.context"
import type { DropdownMenuDirection, DropdownMenuItemOption } from "./dropdown-menu.shared"

function getDropdownMenuTitle(
  children?: ReactNode,
  options?: DropdownMenuItemOption[],
  dropdownValue?: any | any[],
): ReactNode {
  const firstRef: MutableRefObject<ReactNode> = {
    current: undefined,
  }
  const nodeRef: MutableRefObject<ReactNode> = {
    current: undefined,
  }
  Children.forEach(children, (child: ReactNode, index) => {
    if (!isValidElement(child)) {
      return
    }

    const element = child as ReactElement
    const elementType = element.type

    if (elementType === DropdownMenuOption) {
      const { props } = element
      const { title, value, children }: DropdownMenuOptionProps = props
      if (index === 0) {
        firstRef.current = title ?? children
      }
      if (dropdownValue === value) {
        nodeRef.current = title ?? children
      }
    }
  })

  if (!nodeRef.current) {
    if (options) {
      nodeRef.current =
        options.find((option) => option.value === dropdownValue)?.title || options[0].title
    } else {
      nodeRef.current = firstRef.current
    }
  }

  return nodeRef.current
}

interface DropdownMenuChildren {
  titles: ReactNode[]
  items: ReactNode[]
}

function useDropdownMenuChildren(children?: ReactNode): DropdownMenuChildren {
  return useMemo(() => {
    const __children__: DropdownMenuChildren = {
      titles: [],
      items: [],
    }

    Children.forEach(children, (child: ReactNode) => {
      // Skip is not DropdownItem
      if (!isValidElement(child)) {
        return
      }

      const element = child as ReactElement
      const elementType = element.type
      if (elementType === DropdownMenuItem) {
        const { key, props } = element
        const {
          disabled,
          title,
          value,
          children: itemChildren,
          options,
        }: DropdownMenuItemProps = props
        const index = _.size(__children__.items)
        const itemKey = key ?? index

        __children__.items.push(
          cloneElement(element, {
            key: itemKey,
            __dataKey__: itemKey,
          }),
        )

        __children__.titles.push(
          <DropdownMenuTitle
            key={itemKey}
            __dataKey__={itemKey}
            disabled={disabled}
            children={title ?? getDropdownMenuTitle(itemChildren, options, value)}
          />,
        )
      }
    })

    return __children__
  }, [children])
}

export interface DropdownMenuProps extends ViewProps {
  defaultValue?: any
  value?: Key | false
  direction?: DropdownMenuDirection
  children?: ReactNode
  backdropType?: "inner" | "outer"

  onChange?(value: any): void
}

function DropdownMenu(props: DropdownMenuProps) {
  const {
    className,
    defaultValue,
    value: valueProp,
    direction = "down",
    backdropType = "inner",
    children: childrenProp,
    onChange: onChangeProp,
    ...restProps
  } = props

  const { value, setValue } = useUncontrolled<any>({
    value: valueProp,
    onChange: onChangeProp,
  })

  const barRef = useRef<HTMLElement>()

  const [opened, setOpened] = useState<boolean>()

  const [itemOffset, setItemOffset] = useState(0)

  const { titles, items } = useDropdownMenuChildren(childrenProp)

  const toggleKeyRef = useRef<Key>()

  const windowHeight = useMemo(() => getWindowInfo().windowHeight, [])

  const updateItemOffset = useCallback(() => {
    getRect(barRef).then((rect) => {
      // In the mini app, when the page scrolls,
      // the rect may be undefined
      if (rect) {
        if (direction === "down") {
          setItemOffset(rect.bottom)
        } else {
          setItemOffset(windowHeight - rect.top)
        }
      }
    })
  }, [direction, windowHeight])

  const toggleItem = useCallback(
    (itemKey: Key) => {
      const itemActive = value === itemKey ? null : itemKey
      if (itemActive !== null) {
        updateItemOffset()
      }
      setValue(itemActive)
    },
    [setValue, updateItemOffset, value],
  )

  const isItemToggle = useCallback(
    (itemKey?: any) => {
      const active = toggleKeyRef.current === itemKey
      if (active && _.isNull(value)) {
        return null
      }
      return value === itemKey
    },
    [value],
  )

  useEffect(() => {
    const val = value !== false && value !== null && value !== undefined
    if (val) {
      setOpened(val)
    } else {
      setTimeout(() => {
        setOpened(val)
      }, 300)
    }
  }, [value])

  usePageScroll(updateItemOffset)

  useMounted(() => {
    if (_.isNumber(defaultValue) || _.isString(defaultValue)) {
      toggleItem(defaultValue)
      setTimeout(updateItemOffset, 120)
    }
  })

  return (
    <DropdownMenuContext.Provider
      value={{
        direction,
        itemOffset,
        backdropType,
        toggleItem,
        isItemToggle,
      }}
    >
      <View className={classnames(prefixClassname("dropdown-menu"), className)} {...restProps}>
        <View
          ref={barRef}
          className={classnames(prefixClassname("dropdown-menu__bar"), {
            [prefixClassname("dropdown-menu__bar--opened")]: opened,
          })}
          children={titles}
        />
        {items}
      </View>
    </DropdownMenuContext.Provider>
  )
}

export default DropdownMenu
