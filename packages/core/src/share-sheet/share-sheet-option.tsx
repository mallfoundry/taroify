import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
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
import Sheet from "../sheet"
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

interface ShareSheetOptionProps extends ViewProps {
  className?: string
  style?: CSSProperties
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  name?: ReactNode
  description?: ReactNode

  onClick?(event: ITouchEvent): void
}

export function ShareSheetOption(props: ShareSheetOptionProps) {
  const { className, loading, disabled, icon, name, description, onClick, ...restProps } = props
  const { onSelect } = useContext(ShareSheetContext)

  return (
    <Sheet.Item
      className={classNames(prefixClassname("share-sheet__option"), className)}
      loading={loading}
      disabled={loading}
      {...restProps}
      onClick={(event) => {
        onClick?.(event)
        onSelect?.({
          loading,
          disabled,
          icon,
          name,
          description,
        })
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

export default ShareSheetOption
