import { View } from "@tarojs/components"
import classNames from "classnames"
import { ReactNode } from "react"
import { demoPrefixClassname } from "../styles/prefix"
import "./block-card.scss"

interface BlockCardProps {
  className?: string
  children?: ReactNode
}

export default function BlockCard(props: BlockCardProps) {
  const { className, children } = props
  return (
    <View
      className={classNames(demoPrefixClassname("block-card"), className)}
      children={children}
    />
  )
}
