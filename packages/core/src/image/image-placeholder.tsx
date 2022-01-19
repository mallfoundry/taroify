import { View } from "@tarojs/components"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import { prefixClassname } from "../styles"

interface ImagePlaceholderProps {
  prefix: string
  children?: ReactNode
}

export default function ImagePlaceholder(props: ImagePlaceholderProps): JSX.Element {
  const { prefix = "placeholder", children } = props
  // Icon Element
  if (isValidElement(children)) {
    return cloneElement(children as ReactElement, {
      className: classNames(
        prefixClassname(`image__${prefix}`),
        prefixClassname(`image__${prefix}-icon`),
      ),
    })
  }
  // Text String
  if (_.isString(children) || _.isNumber(children)) {
    return <View className={prefixClassname(`image__${prefix}`)} children={children} />
  }
  return <></>
}
