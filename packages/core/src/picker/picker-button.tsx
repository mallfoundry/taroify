import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext } from "react"
import { prefixClassname } from "../styles"
import PickerContext from "./picker.context"

export enum PickerButtonType {
  Cancel = "cancel",
  Confirm = "confirm",
}

type PickerButtonTypeString = "cancel" | "confirm"

export interface PickerButtonProps {
  type?: PickerButtonType | PickerButtonTypeString
  children?: ReactNode

  onClick?(event: ITouchEvent): void
}

export default function PickerButton(props: PickerButtonProps) {
  const { type = PickerButtonType.Cancel, children, onClick } = props

  const { onCancel, onConfirm } = useContext(PickerContext)

  return (
    <View
      className={classNames({
        [prefixClassname("picker__cancel")]: type === PickerButtonType.Cancel,
        [prefixClassname("picker__confirm")]: type === PickerButtonType.Confirm,
      })}
      children={children}
      onClick={(e) => {
        onClick?.(e)
        if (type === PickerButtonType.Cancel) {
          onCancel?.()
        } else if (type === PickerButtonType.Confirm) {
          onConfirm?.()
        }
      }}
    />
  )
}
