import { cloneIconElement } from "@taroify/icons/utils"
import { ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { useContext } from "react"
import { prefixClassname } from "../styles"
import RateContext from "./rate.context"
import { RateStatus } from "./rate.shared"

interface RateItemProps {
  value: number
  half?: boolean
  status: RateStatus

  onClick?(event: ITouchEvent): void
}

function RateItem(props: RateItemProps) {
  const { value, half, status, onClick } = props
  const { voidIcon, fullIcon, halfIcon } = useContext(RateContext)
  const empty = status === RateStatus.Void
  const full = status === RateStatus.Full

  return (
    <View className={prefixClassname("rate__item")} onClick={onClick}>
      {
        //
        cloneIconElement(full ? fullIcon : voidIcon, {
          className: classNames(prefixClassname("rate__icon"), {
            [prefixClassname("rate__icon--full")]: full,
          }),
        })
      }
      {
        //
        half &&
          cloneIconElement(halfIcon, {
            style: { width: value + "em" },
            className: classNames(
              prefixClassname("rate__icon"),
              prefixClassname("rate__icon--half"),
              {
                [prefixClassname("rate__icon--full")]: !empty,
              },
            ),
          })
      }
    </View>
  )
}

export default RateItem
