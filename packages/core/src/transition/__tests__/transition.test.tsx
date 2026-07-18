import { render } from "@testing-library/react"
import * as React from "react"
import Transition from "../transition"

let mockInWechat = false
let mockCSSTransitionProps: any

jest.mock("../../utils/base", () => ({
  get inWechat() {
    return mockInWechat
  },
}))

jest.mock("react-transition-group", () => ({
  CSSTransition: (props: any) => {
    mockCSSTransitionProps = props
    return props.children
  },
}))

describe("<Transition />", () => {
  it("does not pass nodeRef in WeChat Mini Program", () => {
    mockInWechat = true

    render(
      <Transition>
        <div />
      </Transition>,
    )

    expect(mockCSSTransitionProps.nodeRef).toBeUndefined()
  })

  it("keeps passing nodeRef outside WeChat Mini Program", () => {
    mockInWechat = false

    render(
      <Transition>
        <div />
      </Transition>,
    )

    expect(mockCSSTransitionProps.nodeRef).toEqual(
      expect.objectContaining({
        current: expect.any(HTMLElement),
      }),
    )
  })
})
