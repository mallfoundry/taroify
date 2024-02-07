import * as React from "react"
import { ReactNode, FC, CSSProperties, Fragment, isValidElement } from "react"
import { View, Image, Text } from "@tarojs/components"
import classNames from "classnames"
import { ArrowLeft } from "@taroify/icons"
import { prefixClassname } from "../styles"
import { FixedNavItem, FixedNavPosition, FixedNavDirection } from "./fixed-nav.shared"
import Backdrop from "../backdrop"

export interface FixedNavProps {
  className?: string
  style?: CSSProperties
  open: boolean // 是否打开
  data?: FixedNavItem[] // 悬浮列表
  backdrop?: boolean // 是否显示遮罩层
  activeText?: string // 收起按钮文案
  inactiveText?: string // 展开按钮文案
  position?: FixedNavPosition // 垂直位置
  type?: FixedNavDirection // 导航方向
  content?: ReactNode // 自定义按钮
  children?: ReactNode
  onChange?: (value: boolean) => void // 状态变化回调
  onClick?: (item: any) => void // 点击条目
}

const FixedNav: FC<FixedNavProps> = (props) => {
  const {
    className,
    style,
    open,
    backdrop = true,
    position = {
      top: "auto",
      bottom: "auto",
    },
    type = "right",
    activeText = "收起导航",
    inactiveText = "快速导航",
    data = [],
    content,
    children,
    onChange,
    onClick,
  } = props

  const onValueChange = (val: boolean) => {
    onChange?.(val)
  }

  return (
    <View
      className={classNames(
        prefixClassname("fixed-nav"),
        {
          [prefixClassname("fixed-nav--active")]: open,
          [prefixClassname("fixed-nav--left")]: type === "left",
        },
        className,
      )}
      style={{
        ...position,
        ...style,
      }}
    >
      <View
        className={classNames(prefixClassname("fixed-nav_btn"))}
        onClick={() => onValueChange(!open)}
      >
        {content || (
          <Fragment>
            <ArrowLeft color="#fff" className={classNames(prefixClassname("fixed-nav_btn-icon"))} />
            <View className={classNames(prefixClassname("fixed-nav_btn-text"))}>
              {open ? activeText : inactiveText}
            </View>
          </Fragment>
        )}
      </View>
      <View>
        {children || (
          <View className={classNames(prefixClassname("fixed-nav_content"))}>
            {data.map((item, index) => (
              <View
                key={item.id || index}
                className={classNames(prefixClassname("fixed-nav_content--item"))}
                onClick={() => onClick?.(item)}
              >
                {isValidElement(item.icon) ? (
                  item.icon
                ) : (
                  <Image
                    src={item.icon as string}
                    className={classNames(prefixClassname("fixed-nav_content--img"))}
                  />
                )}
                <Text className={classNames(prefixClassname("fixed-nav_content--text"))}>
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
      {backdrop && <Backdrop closeable open={open} onClose={onValueChange} />}
    </View>
  )
}

export default FixedNav
