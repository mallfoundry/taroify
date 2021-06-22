import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { ScrollView, View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
} from "react"
import Image from "../image"
import Sheet, { SheetProps } from "../sheet"
import { prefixClassname } from "../styles"
import ShareSheetContext from "./share-sheet.context"

const PRESET_ICONS = [
  "qq",
  "link",
  "weibo",
  "wechat",
  "poster",
  "qrcode",
  "weapp-qrcode",
  "wechat-moments",
]

interface ShareSheetProps extends SheetProps {
  onSelect?: (event: ShareSheet.OptionEvent) => void
}

function ShareSheet(props: ShareSheetProps) {
  const { className, onSelect, ...restProps } = props
  return (
    <ShareSheetContext.Provider value={{ emitSelect: onSelect }}>
      <Sheet className={classNames(prefixClassname("share-sheet"), className)} {...restProps} />
    </ShareSheetContext.Provider>
  )
}

namespace ShareSheet {
  interface BackdropProps extends Sheet.BackdropProps {}

  export function Backdrop(props: BackdropProps) {
    return <Sheet.Backdrop {...props} />
  }

  interface HeaderProps extends Sheet.HeaderProps {}

  export function Header(props: HeaderProps) {
    const { className, ...restProps } = props
    return (
      <Sheet.Header
        className={classNames(prefixClassname("share-sheet__header"), className)}
        {...restProps}
      />
    )
  }

  export interface OptionEvent {
    loading?: boolean
    disabled?: boolean
    icon?: ReactNode
    name?: ReactNode
    description?: ReactNode
  }

  interface OptionsProps {
    className?: string
    style?: CSSProperties
    children?: ReactNode
  }

  export function Options(props: OptionsProps) {
    const { className, style, children } = props
    return (
      <ScrollView
        className={classNames(prefixClassname("share-sheet__options"), className)}
        style={style}
        scrollX
        children={children}
      />
    )
  }

  function renderOptionIcon(node?: ReactNode): ReactNode {
    if (!isValidElement(node)) {
      // Render preset icon component
      if (_.isString(node) && PRESET_ICONS.includes(node)) {
        return renderOptionIcon(<Image src={`https://img.yzcdn.cn/vant/share-sheet-${node}.png`} />)
      }
      return node
    }

    const element = node as ReactElement
    if (element.type === Image) {
      return cloneElement(element, {
        className: classNames(element.props.className, prefixClassname("share-sheet__option-icon")),
      })
    } else if (isIconElement(element)) {
      return cloneIconElement(element, { className: prefixClassname("share-sheet__option-icon") })
    }
    return node
  }

  interface OptionProps {
    className?: string
    style?: CSSProperties
    loading?: boolean
    disabled?: boolean
    icon?: ReactNode
    name?: ReactNode
    description?: ReactNode
    onClick?: (event: OptionEvent) => void
  }

  export function Option(props: OptionProps) {
    const { className, icon, name, description, onClick, ...restProps } = props
    const { emitSelect } = useContext(ShareSheetContext)

    return (
      <Sheet.Item
        className={classNames(prefixClassname("share-sheet__option"), className)}
        {...restProps}
        onClick={({ disabled, loading }) => {
          const event = {
            disabled,
            loading,
            name,
            description,
          }
          onClick?.(event)
          if (!disabled && !loading) {
            emitSelect?.(event)
          }
        }}
      >
        {icon && renderOptionIcon(icon)}
        {name && <View className={prefixClassname("share-sheet__option-name")} children={name} />}
        {description && (
          <View
            className={prefixClassname("share-sheet__option-description")}
            children={description}
          />
        )}
      </Sheet.Item>
    )
  }

  export function Button(props: Sheet.ButtonProps) {
    return <Sheet.Button {...props} />
  }
}

export default ShareSheet
