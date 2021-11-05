import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classnames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useContext, useMemo, useState } from "react"
import Popup from "../popup"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import DropdownMenuItemContext from "./dropdown-menu-item.context"
import DropdownMenuContext from "./dropdown-menu.context"
import { DropdownMenuOptionEvent } from "./dropdown-menu.shared"

export interface DropdownMenuItemProps extends ViewProps {
  style?: CSSProperties
  __dataKey__?: any
  disabled?: boolean
  title?: ReactNode
  value?: any | any[]
  children?: ReactNode
  onChange?: (value: any | any[]) => void
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  const {
    __dataKey__: dataKey,
    disabled,
    value,
    children,
    onChange,
    style: styleProp,
    ...restProps
  } = props

  const { direction = "down", itemOffset, isItemToggle, toggleItem } = useContext(
    DropdownMenuContext,
  )

  const active = isItemToggle?.(dataKey)

  const [opened, setOpened] = useState(false)

  const down = direction === "down"

  const isOptionToggle = useCallback(
    (aValue?: any) => (_.isArray(value) ? (value as any[]).includes(aValue) : value === aValue),
    [value],
  )

  const toggleOption = useCallback(
    ({ value: evtValue, active }: DropdownMenuOptionEvent) => {
      const multiselect = _.isArray(value)

      if (multiselect) {
        if (active) {
          onChange?.((value as any[]).concat(evtValue))
        } else {
          onChange?.((value as any[]).filter((aValue) => aValue !== evtValue))
        }
      } else {
        onChange?.(value === evtValue && !active ? undefined : evtValue)
      }

      toggleItem?.({ dataKey, disabled })
    },
    [dataKey, disabled, onChange, toggleItem, value],
  )

  const rootStyle = useMemo(() => {
    const style: CSSProperties = {
      ...styleProp,
    }
    if (opened) {
      if (down) {
        style.top = itemOffset ? addUnitPx(itemOffset) : ""
      } else {
        style.bottom = itemOffset ? addUnitPx(itemOffset) : ""
      }
    }
    // if is undefined, state is closing
    if (_.isUndefined(active)) {
      if (!active && !opened) {
        style.display = "none"
      }
    } else {
      style.display = active ? "" : "none"
    }
    return style
  }, [styleProp, opened, active, down, itemOffset])

  return (
    <DropdownMenuItemContext.Provider
      value={{
        toggleOption,
        isOptionToggle,
      }}
    >
      <View
        style={rootStyle}
        className={classnames(
          prefixClassname("dropdown-menu-item"),
          prefixClassname(`dropdown-menu-item--${direction}`),
        )}
        {...restProps}
      >
        <Popup
          open={active}
          className={prefixClassname("dropdown-menu-item__content")}
          placement={down ? "top" : "bottom"}
          onOpen={() => setOpened(true)}
          onClosed={() => setOpened(false)}
        >
          <Popup.Backdrop
            style={{ position: "absolute" }}
            onClick={() => toggleItem?.({ dataKey, disabled })}
          />
          {children}
        </Popup>
      </View>
    </DropdownMenuItemContext.Provider>
  )
}

export default DropdownMenuItem
