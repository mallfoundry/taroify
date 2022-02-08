import { IconProps } from "@taroify/icons/shared"
import { cloneIconElement, isIconElement } from "@taroify/icons/utils"
import { StandardProps } from "@tarojs/components/types/common"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { cloneElement, isValidElement, PropsWithChildren, ReactElement, ReactNode } from "react"
import { prefixClassname } from "../styles"
import BadgeWrapperContext from "./badge-wrapper.context"

function acquireCloneElement(wrapper: ReactNode) {
  if (isIconElement(wrapper)) {
    return cloneIconElement
  }
  if (isValidElement(wrapper)) {
    return cloneElement
  }
}

const createBadgeWrapper =
  <P extends StandardProps = PropsWithChildren<ViewProps>>(wrapper: ReactNode) =>
  (props: P): JSX.Element => {
    const { className, ...restProps } = props
    const cloneElement = acquireCloneElement(wrapper)

    if (cloneElement) {
      wrapper = cloneElement(
        wrapper as ReactElement,
        {
          className: classNames(prefixClassname("badge-wrapper"), className),
          ...restProps,
        } as IconProps,
      )
    }

    return <BadgeWrapperContext.Provider value={{}} children={wrapper} />
  }

export default createBadgeWrapper
