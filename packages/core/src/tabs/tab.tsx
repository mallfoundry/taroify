import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import TabsLine from "./tabs-line"
import Badge, { createBadgeWrapper } from '../badge';
import { isDef } from '../utils/validate'

import '../badge/badge.scss'

interface TabProps extends ViewProps {
  active?: boolean
  disabled?: boolean
  underline?: boolean
  dot?: boolean
  badge?: ReactNode
  ellipsis?: boolean
  flexBasis?: string
  children?: ReactNode
}

export default function Tab(props: TabProps) {
  const {
    className,
    active,
    disabled = false,
    underline,
    ellipsis,
    flexBasis,
    dot,
    badge,
    children,
    ...restProps
  } = props

  const ContentBadgeWrapper = createBadgeWrapper(<View />)

  return (
    <View
      style={{ flexBasis }}
      className={classNames(
        prefixClassname("tabs__tab"),
        {
          [prefixClassname("tabs__tab--active")]: active,
          [prefixClassname("tabs__tab--disabled")]: disabled,
        },
        className,
      )}
      {...restProps}
    >
      <ContentBadgeWrapper>
        <View
          className={classNames(prefixClassname("tabs__tab__content"))}
        >
          <View className={classNames({[prefixClassname("tabs__tab__content-ellipsis")]: ellipsis})}>{children}</View>
        </View>
        {(dot || (isDef(badge) && badge !== '')) && (
          <Badge dot={dot} content={badge} fixed />
        )}
      </ContentBadgeWrapper>
      {underline && <TabsLine active={active} />}
    </View>
  )
}
