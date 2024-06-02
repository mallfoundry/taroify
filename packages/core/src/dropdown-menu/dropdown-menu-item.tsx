import { useUncontrolled } from "@taroify/hooks"
import { ScrollView, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classnames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useContext, useMemo, useState } from "react"
import { ExitHandler } from "react-transition-group/Transition"
import Popup from "../popup"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import DropdownMenuItemContext from "./dropdown-menu-item.context"
import DropdownMenuContext from "./dropdown-menu.context"
import { DropdownMenuItemOption, DropdownMenuOptionEvent } from "./dropdown-menu.shared"
import DropdownMenuOption from "./dropdown-menu-option"

export interface DropdownMenuItemProps extends ViewProps {
  style?: CSSProperties
  __dataKey__?: any
  defaultValue?: any | any[]
  value?: any | any[]
  disabled?: boolean
  lock?: boolean
  title?: ReactNode
  children?: ReactNode
  options?: DropdownMenuItemOption[]

  onChange?(value: any | any[]): void

  onOpen?(): void
  onClose?(): void
  onOpened?(): void
  onClosed?(): void
  /** @deprecated */
  onTransitionExited?: ExitHandler<HTMLElement>
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  const {
    style: styleProp,
    __dataKey__: dataKey,
    defaultValue,
    value: valueProp,
    disabled,
    lock = false,
    children: childProp,
    options,
    onOpen,
    onClose,
    onOpened,
    onClosed,
    onChange: onChangeProp,
    onTransitionExited,
    ...restProps
  } = props

  const { getValue, setValue } = useUncontrolled({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  })

  const children = useMemo(() => {
    return childProp
      ? childProp
      : (options || []).map((option, idx) => (
          <DropdownMenuOption key={option.value || idx} {...option} />
        ))
  }, [childProp, options])

  const {
    direction = "down",
    itemOffset,
    backdropType = "inner",
    isItemToggle,
    toggleItem: triggerItem,
  } = useContext(DropdownMenuContext)

  const active = useMemo(() => isItemToggle?.(dataKey), [dataKey, isItemToggle])

  const [opened, setOpened] = useState(false)

  const down = direction === "down"

  const toggleItem = useCallback(() => {
    if (!disabled) {
      triggerItem?.(dataKey)
    }
  }, [dataKey, disabled, triggerItem])

  const isOptionToggle = useCallback(
    (aValue?: any) =>
      _.isArray(getValue()) ? (getValue() as any[]).includes(aValue) : getValue() === aValue,
    [getValue],
  )

  const toggleOption = useCallback(
    ({ value: evtValue, active }: DropdownMenuOptionEvent) => {
      const value = getValue()
      const multiselect = _.isArray(value)

      if (multiselect) {
        if (active) {
          setValue((value as any[]).concat(evtValue))
        } else {
          setValue((value as any[]).filter((aValue) => aValue !== evtValue))
        }
      } else {
        setValue(value === evtValue && !active ? undefined : evtValue)
      }

      toggleItem()
    },
    [getValue, setValue, toggleItem],
  )

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {}
    if (opened) {
      if (down) {
        style.top = itemOffset ? addUnitPx(itemOffset) : ""
      } else {
        style.bottom = itemOffset ? addUnitPx(itemOffset) : ""
      }
    }
    style.display = !active && !opened ? "none" : ""
    return style
  }, [opened, active, down, itemOffset])

  return (
    <DropdownMenuItemContext.Provider
      value={{
        toggleOption,
        isOptionToggle,
      }}
    >
      <View
        style={{
          ...styleProp,
          ...rootStyle,
        }}
        className={classnames(
          prefixClassname("dropdown-menu-item"),
          prefixClassname(`dropdown-menu-item--${direction}`),
        )}
        {...restProps}
      >
        <Popup
          open={_.isBoolean(active) && active}
          className={prefixClassname("dropdown-menu-item__content")}
          placement={down ? "top" : "bottom"}
          lock={lock}
          onTransitionEnter={() => {
            setOpened(true)
            onOpen?.()
          }}
          onTransitionEntered={() => {
            onOpened?.()
          }}
          onTransitionExit={() => {
            onClose?.()
          }}
          onTransitionExited={(...args) => {
            setOpened(false)
            onTransitionExited?.(...args)
            onClosed?.()
          }}
        >
          <Popup.Backdrop
            lock={lock}
            style={{ position: backdropType === "inner" ? "absolute" : "fixed" }}
            onClick={toggleItem}
          />
          {lock ? (
            <ScrollView className={prefixClassname("dropdown-menu-item__content--scroll")} scrollY>
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </Popup>
      </View>
    </DropdownMenuItemContext.Provider>
  )
}

export default DropdownMenuItem
