import { Calendar } from "@taroify/core"
import * as React from "react"
import { useState } from "react"
import Block from "../../../components/block"
import BlockCard from "../../../components/block-card"
import Page from "../../../components/page"
import "./index.scss"

const minDate = new Date(2021, 1, 10)

const defaultDate1 = new Date(2021, 2, 10)
const defaultDate2 = new Date(2021, 4, 10)
const maxDate = new Date(2021, 10, 20)

const defaultMultipleDate = [defaultDate1, defaultDate2]

function BasicCalendar() {
  const [value, setValue] = useState<Date[]>([defaultDate2, defaultDate1])
  return (
    <Calendar
      style={{ height: "800px" }}
      type="multiple"
      min={minDate}
      max={maxDate}
      defaultValue={defaultMultipleDate}
      value={value}
      onChange={setValue}
    />
  )
}

export default function CalendarDemo() {
  return (
    <Page title="Calendar 日历" className="calendar-demo">
      <Block title="基础用法">
        <BlockCard>
          <BasicCalendar />
        </BlockCard>
      </Block>
    </Page>
  )
}
