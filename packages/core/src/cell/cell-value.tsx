import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"

interface CellValueProps extends ViewProps {
  alone?: boolean
  children: ReactNode
}

function CellValue(props: CellValueProps) {
  const { className, alone, ...restProps } = props
  return (
    <View
      className={classNames(
        prefixClassname("cell__value"),
        {
          [prefixClassname("cell__value--alone")]: alone,
        },
        className,
      )}
      {...restProps}
    />
  )
}

export default CellValue
