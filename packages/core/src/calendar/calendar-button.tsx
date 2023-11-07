import { ITouchEvent } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext, useMemo } from "react"
import Button, { ButtonProps } from "../button"
import { prefixClassname } from "../styles"
import CalendarContext from "./calendar.context"

export interface CalendarButtonProps extends ButtonProps {
  type?: "confirm"
  confirmText?: React.ReactNode
  confirmDisabledText?: React.ReactNode
}

function CalendarButton(props: CalendarButtonProps) {
  const { className, confirmText, confirmDisabledText, type = "confirm", children = "确定", onClick, ...restProps } = props
  const confirm = type === "confirm"
  const { value: currentValue, type: ctxType, onConfirm } = useContext(CalendarContext)

  const disabled = useMemo(() => {
    if (currentValue) {
      if (ctxType === "range") {
        return !(currentValue as Date[])[0] || !(currentValue as Date[])[1]
      }
      if (ctxType === "multiple") {
        return !(currentValue as Date[]).length
      }
    }
    return Array.isArray(currentValue) ? currentValue.length === 0 : !currentValue
  }, [ctxType, currentValue])

  return (
    <Button
      className={classNames(
        {
          [prefixClassname("calendar__confirm")]: confirm,
        },
        className,
      )}
      shape="round"
      block
      disabled={confirm && disabled}
      color="danger"
      onClick={(event: ITouchEvent) => {
        onClick?.(event)
        if (confirm && !disabled) {
          onConfirm?.()
        }
      }}
      {...restProps}
    >
      {
        props.children ? children :
          disabled ? confirmDisabledText : confirmText
      }
    </Button>
  )
}

CalendarButton.defaultProps = {
  type: "confirm",
}

export default CalendarButton
