import { ITouchEvent } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext } from "react"
import { prefixClassname } from "../styles"
import SheetGap from "./sheet-gap"
import SheetItem, { SheetItemProps } from "./sheet-item"
import SheetContext from "./sheet.context"

export type SheetButtonType = "button" | "cancel"

export interface SheetButtonProps extends SheetItemProps {
  type?: SheetButtonType
}

export default function SheetButton(props: SheetButtonProps) {
  const { className, type, onClick, ...restProps } = props
  const { onCancel } = useContext(SheetContext)

  function handleClick(event: ITouchEvent) {
    onClick?.(event)
    if (type === "cancel") {
      onCancel?.()
    }
  }

  return (
    <>
      <SheetGap />
      <SheetItem
        className={classNames(
          prefixClassname("sheet__button"),
          {
            [prefixClassname("sheet__button--cancel")]: type === "cancel",
          },
          className,
        )}
        onClick={handleClick}
        {...restProps}
      />
    </>
  )
}
