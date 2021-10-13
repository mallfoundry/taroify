import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import RateContext from "./rate.context"
import { RateStatus } from "./rate.shared"

interface RateItemProps {
  score: number
  value: number
  half?: boolean
  disabled?: boolean
  size?: number
  status: RateStatus

  onClick?(event: ITouchEvent): void
}

function RateItem(props: RateItemProps) {
  const { score, value, half, disabled, size, status, onClick } = props
  const { gutter, count, emptyIcon, icon } = useContext(RateContext)

  const empty = status === RateStatus.Void
  const full = status === RateStatus.Full
  return (
    <View
      className={prefixClassname("rate__item")}
      style={{
        paddingRight: score !== count ? addUnitPx(gutter) : "",
      }}
      onClick={onClick}
    >
      {
        //
        cloneIconElement(full ? icon : emptyIcon, {
          size,
          className: classNames(prefixClassname("rate__icon"), {
            [prefixClassname("rate__icon--disabled")]: disabled,
            [prefixClassname("rate__icon--full")]: full,
          }),
        })
      }
      {
        //
        half &&
          cloneIconElement(icon, {
            style: { width: value + "em" },
            size,
            className: classNames(
              prefixClassname("rate__icon"),
              prefixClassname("rate__icon--half"),
              {
                [prefixClassname("rate__icon--disabled")]: disabled,
                [prefixClassname("rate__icon--full")]: !empty,
              },
            ),
          })
      }
    </View>
  )
}

export default RateItem
