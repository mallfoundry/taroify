import { render } from "@testing-library/react"
import * as React from "react"
import { View } from "@tarojs/components"
import { prefixClassname } from "../../styles"
import FixedView from "../fixed-view"
import useHeight from "../../hooks/use-height"

jest.mock("../../hooks/use-height", () => jest.fn())

const mockedUseHeight = useHeight as jest.MockedFunction<typeof useHeight>

describe("<FixedView />", () => {
  beforeEach(() => {
    mockedUseHeight.mockReset()
  })

  it("should keep placeholder height when measurement falls back to zero", () => {
    mockedUseHeight.mockReturnValueOnce(97).mockReturnValueOnce(0)

    const { container, rerender } = render(
      <FixedView position="top" placeholder>
        <View>content</View>
      </FixedView>,
    )

    const el = container.querySelector(`.${prefixClassname("fixed-view__placeholder")}`)
    expect(el).toHaveStyle("height: 97px")

    rerender(
      <FixedView position="top" placeholder>
        <View>content</View>
      </FixedView>,
    )

    expect(el).toHaveStyle("height: 97px")
  })
})
