import { View } from "@tarojs/components"
import classNames from "classnames"
import { ReactNode } from "react"
import { demoPrefixClassname } from "../styles/prefix"
import "./block.scss"

type BlockVariant = "card"

interface BlockProps {
  className?: string
  variant?: BlockVariant
  title?: ReactNode
  children?: ReactNode
}

export default function Block(props: BlockProps) {
  const { className, variant, title, children } = props
  return (
    <View className={classNames(demoPrefixClassname("block"), className)}>
      {title && <View className={demoPrefixClassname("block__title")} children={title} />}
      <View
        className={classNames({
          [demoPrefixClassname("block__content")]: variant !== "card",
          [demoPrefixClassname("block__card")]: variant === "card",
        })}
      >
        {children}
      </View>
    </View>
  )
}
