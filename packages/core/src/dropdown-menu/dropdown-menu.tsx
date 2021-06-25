import { View } from "@tarojs/components"
import classnames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  cloneElement,
  isValidElement,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { prefixClassname } from "../styles"
import { getBoundingClientRect } from "../utils/rect"
import DropdownItem, {
  DropdownItemProps,
} from "@taroify/~core/src/dropdown-menu/dropdown-menu-item"
import DropdownMenuOption, { DropdownMenuOptionProps } from "./dropdown-menu-option"
import DropdownMenuTitle from "./dropdown-menu-title"
import DropdownMenuContext from "./dropdown-menu.context"
import {
  DropdownMenuDirection,
  DropdownMenuKey,
  DropdownMenuValue,
  DropdownMenuValues,
} from "./dropdown-menu.shared"

function getDropdownMenuTitle(
  options?: ReactNode,
  dropdownValue?: DropdownMenuValue | DropdownMenuValues,
): ReactNode {
  const firstRef: MutableRefObject<ReactNode> = {
    current: undefined,
  }
  const nodeRef: MutableRefObject<ReactNode> = {
    current: undefined,
  }
  Children.forEach(options, (child: ReactNode, index) => {
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
    nodeRef.current = firstRef.current
  }

  return nodeRef.current
}

interface DropdownMenuChildren {
  titles: ReactNode[]
  items: ReactNode[]
}

function useDropdownMenuChildren(children?: ReactNode): DropdownMenuChildren {
  const __children__: DropdownMenuChildren = {
    titles: [],
    items: [],
  }

  Children.forEach(children, (child: ReactNode, index) => {
    // Skip is not DropdownItem
    if (!isValidElement(child)) {
      return
    }

    const element = child as ReactElement
    const elementType = element.type
    if (elementType === DropdownItem) {
      const { key, props } = element
      const { disabled, title, value }: DropdownItemProps = props
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
          children={title ?? getDropdownMenuTitle(props.children, value)}
        />,
      )
    }
  })

  return __children__
}

export interface DropdownMenuProps {
  activeKey?: DropdownMenuKey
  activeColor?: string
  direction?: DropdownMenuDirection
  children?: ReactNode
  onChange?: (key?: DropdownMenuKey) => void
}

function DropdownMenu(props: DropdownMenuProps) {
  const { activeKey, activeColor, direction = DropdownMenuDirection.Down, onChange } = props
  const barRef = useRef<HTMLElement>()
  const [opened, setOpened] = useState<boolean>()
  const [itemOffset, setItemOffset] = useState(0)
  const { titles, items } = useDropdownMenuChildren(props.children)

  const toggleKeyRef = useRef<DropdownMenuKey>()

  const toggleItem = useCallback(
    ({ dataKey: itemKey, disabled: itemDisabled }) => {
      if (itemDisabled) {
        return
      }
      toggleKeyRef.current = itemKey
      onChange?.(activeKey === itemKey ? undefined : itemKey)

      getBoundingClientRect(barRef).then((rect) => {
        if (direction === DropdownMenuDirection.Down) {
          setItemOffset(rect.bottom)
        } /*else {
        offset.value = window.innerHeight - rect.top
      }*/
      })
    },
    [activeKey, direction, onChange],
  )

  const isItemToggle = useCallback(
    (key?: DropdownMenuKey) => {
      const active = toggleKeyRef.current === key
      if (active && _.isUndefined(activeKey)) {
        return undefined
      }
      return activeKey === key
    },
    [activeKey],
  )

  useEffect(() => setOpened(activeKey !== undefined), [activeKey, isItemToggle])

  return (
    <DropdownMenuContext.Provider
      value={{
        activeColor,
        direction,
        itemOffset,
        toggleItem,
        isItemToggle,
      }}
    >
      <View className={prefixClassname("dropdown-menu")}>
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
