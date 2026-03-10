import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CellValueProps extends ViewProps {
  alone?: boolean
  children: ReactNode
  valueClass?: string
}

function CellValue(props: CellValueProps) {
  const { className, alone, valueClass, children, ...restProps } = props
  const empty = React.Children.count(children) === 0
  return (
    <View
      className={classNames(
        prefixClassname("cell__value"),
        {
          [prefixClassname("cell__value--alone")]: alone,
          [prefixClassname("cell__value--empty")]: empty,
        },
        className,
        valueClass,
      )}
      {...restProps}
    >
      {children}
    </View>
  )
}

export default CellValue
