import { act, fireEvent, render, waitFor } from "@testing-library/react"
import * as React from "react"
import { prefixClassname } from "../../styles"
import { getScrollTop } from "../../utils/dom/scroll"
import Calendar from ".."
import { genMonthId } from "../calendar.shared"

let mockScrollTop = 0
let mockEnvironment = "WEB"
let mockMissingMonthRef = false

jest.mock("@tarojs/taro", () => ({
  getEnv: () => mockEnvironment,
  nextTick: (callback: () => void) => callback(),
}))

jest.mock("../../utils/dom/rect", () => ({
  getRect: jest.fn(async (target) => {
    const element = target?.current ?? target
    const body = element?.classList?.contains("taroify-calendar__body")
    const height = body ? 50 : 100

    return {
      id: element?.getAttribute?.("id") ?? "",
      dataset: {},
      top: 0,
      right: 100,
      bottom: height,
      left: 0,
      width: 100,
      height,
    }
  }),
}))

jest.mock("../../utils/dom/scroll", () => ({
  getScrollTop: jest.fn(async () => mockScrollTop),
}))

jest.mock("../../utils/raf", () => ({
  __esModule: true,
  default: (callback: FrameRequestCallback) => {
    callback(0)
    return 1
  },
}))

jest.mock("../calendar-month", () => {
  const React = jest.requireActual("react") as typeof import("react")

  return {
    __esModule: true,
    default: React.forwardRef((props: { value: Date }, ref) => {
      React.useImperativeHandle(
        ref,
        () =>
          mockMissingMonthRef
            ? null
            : {
                disabledDays: [],
                getHeight: () => 100,
                getValue: () => props.value,
                getRectTop: async () => props.value.getMonth() * 100,
              },
        [props.value],
      )

      return React.createElement("div", {
        id: `taroify-calendar-${props.value.getFullYear()}-${props.value.getMonth()}`,
        "data-testid": `month-${props.value.getMonth()}`,
      })
    }),
  }
})

const min = new Date(2024, 0, 1)
const max = new Date(2024, 1, 29)

describe("<Calendar /> scrolling", () => {
  beforeEach(() => {
    mockScrollTop = 0
    mockEnvironment = "WEB"
    mockMissingMonthRef = false
  })

  it("updates the default subtitle to the visible month", async () => {
    const { container } = render(
      <Calendar min={min} max={max} value={new Date(2024, 0, 10)} showConfirm={false} />,
    )
    const subtitle = container.querySelector(`.${prefixClassname("calendar__header-subtitle")}`)
    const body = container.querySelector(`.${prefixClassname("calendar__body")}`) as HTMLElement

    await waitFor(() => expect(subtitle).toHaveTextContent("2024年1月"))
    await waitFor(() => expect(getScrollTop).toHaveBeenCalled())

    mockScrollTop = 101
    await act(async () => {
      fireEvent.scroll(body)
    })

    await waitFor(() => expect(subtitle).toHaveTextContent("2024年2月"))
  })

  it("uses scrollIntoView outside the web environment", async () => {
    mockEnvironment = "WEAPP"
    const { container } = render(
      <Calendar min={min} max={max} value={new Date(2024, 1, 10)} showConfirm={false} />,
    )
    const body = container.querySelector(`.${prefixClassname("calendar__body")}`)

    await waitFor(() =>
      expect(body).toHaveAttribute("scroll-into-view", genMonthId(new Date(2024, 1, 1))),
    )
  })

  it("does not throw while month refs are temporarily unavailable", async () => {
    mockMissingMonthRef = true
    const { container } = render(
      <Calendar min={min} max={max} value={new Date(2024, 0, 10)} showConfirm={false} />,
    )
    const body = container.querySelector(`.${prefixClassname("calendar__body")}`) as HTMLElement

    await act(async () => {
      fireEvent.scroll(body)
    })

    expect(body).toBeInTheDocument()
  })
})
