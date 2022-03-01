import ArrowRight from "@taroify/icons/ArrowRight"
import { Navigator, View } from "@tarojs/components"
import { ReactNode } from "react"
import { demoPrefixClassname } from "../../styles/prefix"
import { framedWrapper, navigateTo } from "../../utils/framed-router"
import "./nav.scss"

interface NavBlockProps {
  title?: ReactNode
  component?: string
  href?: string
}

export function NavBlock(props: NavBlockProps) {
  const { title, component, href } = props
  if (framedWrapper()) {
    function handleClick() {
      if (component) {
        navigateTo({ component })
      }
    }

    return (
      <View className={demoPrefixClassname("nav__block")} onClick={handleClick}>
        {title}
        <ArrowRight size="small" />
      </View>
    )
  }

  return (
    <Navigator className={demoPrefixClassname("nav__block")} url={href}>
      {title}
      <ArrowRight size="small" />
    </Navigator>
  )
}

interface NavProps {
  title?: string
  children?: ReactNode
}

export default function Nav(props: NavProps) {
  const { title, children } = props
  return (
    <View className={demoPrefixClassname("nav")}>
      <View className={demoPrefixClassname("nav__title")}>{title}</View>
      <View className={demoPrefixClassname("nav__blocks")}>{children}</View>
    </View>
  )
}
