import { ITouchEvent } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext, useMemo } from "react"
import Button, { ButtonProps } from "../button"
import { prefixClassname } from "../styles"
import CalendarContext from "./calendar.context"

export interface CalendarButtonProps extends ButtonProps {
  type?: "confirm"
}

function CalendarButton(props: CalendarButtonProps) {
  const { className, type = "confirm", children = "确定", onClick, ...restProps } = props
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
    return !currentValue
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
      children={children}
      onClick={(event: ITouchEvent) => {
        onClick?.(event)
        if (confirm && !disabled) {
          onConfirm?.()
        }
      }}
      {...restProps}
    />
  )
}

CalendarButton.defaultProps = {
  type: "confirm",
}

export default CalendarButton
