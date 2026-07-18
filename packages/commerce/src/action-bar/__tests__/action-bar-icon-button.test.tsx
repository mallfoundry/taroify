import { render } from "@testing-library/react"
import { CartOutlined, ShopOutlined } from "@taroify/icons"
import * as React from "react"
import ActionBarIconButton from "../action-bar-icon-button"

describe("<ActionBarIconButton />", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("should assign keys to badge-wrapped icon children", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {})

    render(
      <ActionBarIconButton badge={2}>
        <CartOutlined />
        <ShopOutlined />
        购物车
      </ActionBarIconButton>,
    )

    const messages = consoleError.mock.calls.flat().join(" ")
    expect(messages).not.toContain('Each child in a list should have a unique "key" prop')
  })
})
