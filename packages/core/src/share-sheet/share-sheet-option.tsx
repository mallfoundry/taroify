import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
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
  useMemo,
} from "react"
import ButtonBase, { ButtonBaseProps } from "../button-base"
import Image from "../image"
import { useSheetProps } from "../sheet"
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

function renderShareSheetOptionIcon(node?: ReactNode): ReactNode {
  if (!isValidElement(node)) {
    // Render preset icon component
    if (_.isString(node) && PRESET_ICONS.includes(node)) {
      return renderShareSheetOptionIcon(
        <Image src={`https://img.yzcdn.cn/vant/share-sheet-${node}.png`} />,
      )
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

function useShareSheetOptionIcon(node?: ReactNode) {
  return useMemo(() => renderShareSheetOptionIcon(node), [node])
}

interface ShareSheetOptionProps
  extends Omit<ButtonBaseProps, "size" | "type" | "plain" | "loading" | "formType"> {
  className?: string
  style?: CSSProperties
  value?: any
  disabled?: boolean
  icon?: ReactNode
  name?: ReactNode
  description?: ReactNode
}

export function ShareSheetOption(mixedProps: ShareSheetOptionProps) {
  const [
    buttonProps,
    {
      className,
      style,
      value,
      disabled,
      icon,
      name,
      description,
      onClick, //
      ...restProps
    },
  ] = useSheetProps<ShareSheetOptionProps>(mixedProps)
  const { onSelect } = useContext(ShareSheetContext)
  const image = useShareSheetOptionIcon(icon)

  return (
    <View
      className={classNames(prefixClassname("share-sheet__option"), className)}
      style={style}
      onClick={(event) => {
        onClick?.(event)
        onSelect?.({
          value,
          disabled,
          icon,
          name,
          description,
        })
      }}
      {...restProps}
    >
      {icon && image}
      {name && <View className={prefixClassname("share-sheet__option-name")} children={name} />}
      {description && (
        <View
          className={prefixClassname("share-sheet__option-description")}
          children={description}
        />
      )}
      <ButtonBase className={prefixClassname("share-sheet__button")} {...buttonProps} />
    </View>
  )
}

export default ShareSheetOption
