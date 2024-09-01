import { fireEvent, render } from "@testing-library/react"
import { LocationOutlined } from "@taroify/icons"
import * as React from "react"
import Cell from "../cell"
import { prefixClassname } from "../../styles"

describe("<Cell />", () => {
  it("renders without title and brief", () => {
    const { container } = render(<Cell>内容</Cell>)

    expect(container.querySelector(`.${prefixClassname("cell__title")}`)).toBeNull()
    expect(container.querySelector(`.${prefixClassname("cell__brief")}`)).toBeNull()
    expect(container.querySelector(`.${prefixClassname("cell__value")}`)?.innerHTML).toBe("内容")
    expect(container).toMatchSnapshot()
  })

  it("renders title and content", () => {
    const { container } = render(<Cell title="单元格">内容</Cell>)

    expect(container.querySelector(`.${prefixClassname("cell__title")}`)?.innerHTML).toBe("单元格")
    expect(container.querySelector(`.${prefixClassname("cell__value")}`)?.innerHTML).toBe("内容")
    expect(container).toMatchSnapshot()
  })

  it("renders title brief content and test", () => {
    const { container } = render(
      <Cell title="单元格" brief="描述信息">
        内容
      </Cell>,
    )

    expect(container.querySelector(`.${prefixClassname("cell__title")}`)?.innerHTML).toMatch(
      "单元格",
    )
    expect(container.querySelector(`.${prefixClassname("cell__brief")}`)?.innerHTML).toBe(
      "描述信息",
    )
    expect(container.querySelector(`.${prefixClassname("cell__value")}`)?.innerHTML).toBe("内容")
    expect(container).toMatchSnapshot()
  })

  it("render size", () => {
    const { container } = render(
      <Cell title="单元格" brief="描述信息" size="large">
        内容
      </Cell>,
    )

    expect(container.querySelector(`.${prefixClassname("cell--large")}`)).not.toBeNull()
    expect(container).toMatchSnapshot()
  })

  it("render icon", () => {
    const { container } = render(
      <Cell title="单元格" brief="描述信息" icon={<LocationOutlined />}>
        内容
      </Cell>,
    )

    expect(container.querySelector(".van-icon-location-o")).not.toBeNull()
    expect(container).toMatchSnapshot()
  })

  it("render click event", () => {
    const mockOnClick = jest.fn()
    const { container } = render(
      <Cell title="单元格" onClick={mockOnClick}>
        内容
      </Cell>,
    )

    const btn = container.querySelector(`.${prefixClassname("cell")}`)
    if (!btn) throw "err"

    fireEvent.click(btn)

    expect(mockOnClick).toHaveBeenCalled()
  })

  it("render isLink and arrowDirection", () => {
    const { container } = render(
      <Cell title="单元格" isLink arrowDirection="down">
        内容
      </Cell>,
    )

    expect(container.querySelector(".van-icon-arrow-down")).not.toBeNull()
    expect(container).toMatchSnapshot()
  })

  it("render align", () => {
    const { container } = render(
      <Cell title="单元格" brief="align end" isLink align="end">
        内容
      </Cell>,
    )

    expect(container.querySelector(`.${prefixClassname("cell--end")}`)).not.toBeNull()
    expect(container).toMatchSnapshot()
  })
})
