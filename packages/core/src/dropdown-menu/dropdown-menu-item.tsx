import { View } from "@tarojs/components"
import classnames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { CSSProperties, ReactNode, useCallback, useContext, useMemo, useState } from "react"
import Popup, { PopupPlacement } from "../popup"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import DropdownMenuItemContext from "./dropdown-menu-item.context"
import DropdownMenuContext from "./dropdown-menu.context"
import {
  DropdownMenuDirection,
  DropdownMenuKey,
  DropdownMenuOptionEvent,
  DropdownMenuValue,
  DropdownMenuValues,
} from "./dropdown-menu.shared"

export interface DropdownMenuItemProps {
  __dataKey__?: DropdownMenuKey
  disabled?: boolean
  title?: ReactNode
  value?: DropdownMenuValue | DropdownMenuValues
  children?: ReactNode
  onChange?: (value: DropdownMenuValue | DropdownMenuValues) => void
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  const { __dataKey__: dataKey, disabled, value, children, onChange } = props

  const {
    direction = DropdownMenuDirection.Down,
    itemOffset,
    isItemToggle,
    toggleItem,
  } = useContext(DropdownMenuContext)

  const active = isItemToggle?.(dataKey)

  const [opened, setOpened] = useState(false)

  const down = direction === DropdownMenuDirection.Down

  const isOptionToggle = useCallback(
    (aValue?: DropdownMenuValue) =>
      _.isArray(value) ? (value as any[]).includes(aValue) : value === aValue,
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
    const style: CSSProperties = {}
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
  }, [active, opened, down, itemOffset])

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
      >
        <Popup
          open={active}
          className={prefixClassname("dropdown-menu-item__content")}
          placement={down ? PopupPlacement.Top : PopupPlacement.Bottom}
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
