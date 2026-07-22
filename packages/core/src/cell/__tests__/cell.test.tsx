import { LocationOutlined } from "@taroify/icons"
import { fireEvent, render } from "@testing-library/react"
import * as React from "react"
import { prefixClassname } from "../../styles"
import Cell from "../index"

function getCell(container: HTMLElement) {
  return container.querySelector(`.${prefixClassname("cell")}`) as HTMLElement
}

describe("<Cell />", () => {
  it("renders title, brief and value with custom props", () => {
    const onClick = jest.fn()
    const { container } = render(
      <Cell
        id="profile-cell"
        className="custom-cell"
        style={{ backgroundColor: "red" }}
        title="用户名"
        titleClass="custom-title"
        titleStyle={{ color: "blue" }}
        brief="用于登录"
        briefClass="custom-brief"
        valueClass="custom-value"
        onClick={onClick}
      >
        Pilotager
      </Cell>,
    )
    const cell = getCell(container)
    const title = container.querySelector(`.${prefixClassname("cell__title")}`)
    const brief = container.querySelector(`.${prefixClassname("cell__brief")}`)
    const value = container.querySelector(`.${prefixClassname("cell__value")}`)

    expect(cell).toHaveClass(prefixClassname("cell"), "custom-cell")
    expect(cell).toHaveAttribute("id", "profile-cell")
    expect(cell).toHaveStyle({ backgroundColor: "red" })
    expect(title).toHaveClass("custom-title")
    expect(title).toHaveStyle({ color: "blue" })
    expect(title).toHaveTextContent("用户名用于登录")
    expect(brief).toHaveClass("custom-brief")
    expect(brief).toHaveTextContent("用于登录")
    expect(value).toHaveClass("custom-value")
    expect(value).toHaveTextContent("Pilotager")

    fireEvent.click(cell)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("renders a value alone when the title and brief are absent", () => {
    const { container } = render(<Cell>内容</Cell>)
    const value = container.querySelector(`.${prefixClassname("cell__value")}`)

    expect(container.querySelector(`.${prefixClassname("cell__title")}`)).not.toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("cell__brief")}`)).not.toBeInTheDocument()
    expect(value).toHaveClass(prefixClassname("cell__value--alone"))
    expect(value).not.toHaveClass(prefixClassname("cell__value--empty"))
    expect(value).toHaveTextContent("内容")
  })

  it("renders zero as valid title, brief and value content", () => {
    const { container } = render(
      <Cell title={0} brief={0}>
        {0}
      </Cell>,
    )
    const title = container.querySelector(`.${prefixClassname("cell__title")}`)
    const brief = container.querySelector(`.${prefixClassname("cell__brief")}`)
    const value = container.querySelector(`.${prefixClassname("cell__value")}`)

    expect(title).toHaveTextContent("0")
    expect(brief).toHaveTextContent("0")
    expect(value).toHaveTextContent("0")
    expect(value).not.toHaveClass(
      prefixClassname("cell__value--alone"),
      prefixClassname("cell__value--empty"),
    )
  })

  it("marks an absent value as empty", () => {
    const { container } = render(<Cell title="单元格" />)
    const value = container.querySelector(`.${prefixClassname("cell__value")}`)

    expect(value).toHaveClass(prefixClassname("cell__value--empty"))
    expect(value).not.toHaveClass(prefixClassname("cell__value--alone"))
    expect(value).toBeEmptyDOMElement()
  })

  it("renders large, clickable, required and borderless states", () => {
    const { container } = render(
      <Cell size="large" clickable required bordered={false}>
        内容
      </Cell>,
    )

    expect(getCell(container)).toHaveClass(
      prefixClassname("cell--large"),
      prefixClassname("cell--clickable"),
      prefixClassname("cell--required"),
      prefixClassname("cell--borderless"),
    )
  })

  it.each(["start", "center", "end"] as const)("renders the %s alignment", (align) => {
    const { container } = render(<Cell align={align}>内容</Cell>)

    expect(getCell(container)).toHaveClass(prefixClassname(`cell--${align}`))
  })

  it.each([
    ["default", undefined, "arrow"],
    ["left", "left", "arrow-left"],
    ["up", "up", "arrow-up"],
    ["down", "down", "arrow-down"],
  ] as const)("renders the %s link arrow direction", (_, arrowDirection, iconName) => {
    const { container } = render(
      <Cell title="单元格" isLink arrowDirection={arrowDirection}>
        内容
      </Cell>,
    )
    const rightIcon = container.querySelector(`.${prefixClassname("cell__right-icon")}`)

    expect(getCell(container)).toHaveClass(prefixClassname("cell--clickable"))
    expect(rightIcon).toHaveClass(`van-icon-${iconName}`)
  })

  it("decorates icon elements and lets rightIcon override the link arrow", () => {
    const { container, getByTestId } = render(
      <Cell
        title="地址"
        icon={<LocationOutlined data-testid="left-icon" className="custom-left-icon" />}
        rightIcon={<LocationOutlined data-testid="right-icon" className="custom-right-icon" />}
        isLink
      >
        杭州
      </Cell>,
    )

    expect(getByTestId("left-icon")).toHaveClass("custom-left-icon", prefixClassname("cell__icon"))
    expect(getByTestId("right-icon")).toHaveClass(
      "custom-right-icon",
      prefixClassname("cell__right-icon"),
    )
    expect(container.querySelector(".van-icon-arrow")).not.toBeInTheDocument()
  })

  it("renders custom icon nodes without changing them", () => {
    const { container, getByTestId } = render(
      <Cell
        icon={<span data-testid="custom-left">左侧</span>}
        rightIcon={<span data-testid="custom-right">右侧</span>}
      >
        内容
      </Cell>,
    )
    const cell = getCell(container)
    const leftIcon = getByTestId("custom-left")
    const rightIcon = getByTestId("custom-right")

    expect(cell.firstElementChild).toBe(leftIcon)
    expect(cell.lastElementChild).toBe(rightIcon)
    expect(leftIcon).not.toHaveClass(prefixClassname("cell__icon"))
    expect(rightIcon).not.toHaveClass(prefixClassname("cell__right-icon"))
    expect(cell).not.toHaveClass(prefixClassname("cell--clickable"))
  })
})

describe("<Cell.Group />", () => {
  it("renders a titled inset group with borders and passes view props", () => {
    const { container, getByTestId } = render(
      <Cell.Group
        id="settings-group"
        data-testid="settings-group"
        className="custom-group"
        style={{ backgroundColor: "red" }}
        title="设置"
        inset
      >
        <Cell title="语言">中文</Cell>
      </Cell.Group>,
    )
    const group = getByTestId("settings-group")
    const title = container.querySelector(`.${prefixClassname("cell-group__title")}`)
    const body = group.querySelector(`.${prefixClassname("cell-group")}`)

    expect(group).toHaveClass("custom-group", prefixClassname("cell-group--inset"))
    expect(group).toHaveAttribute("id", "settings-group")
    expect(group).toHaveStyle({ backgroundColor: "red" })
    expect(title).toHaveClass(prefixClassname("cell-group__title--inset"))
    expect(title).toHaveTextContent("设置")
    expect(body).toHaveClass(prefixClassname("hairline--top-bottom"))
    expect(body).toHaveTextContent("语言中文")
  })

  it("supports a borderless group without a title", () => {
    const { container } = render(
      <Cell.Group bordered={false}>
        <Cell>内容</Cell>
      </Cell.Group>,
    )
    const groups = container.querySelectorAll(`.${prefixClassname("cell-group")}`)

    expect(
      container.querySelector(`.${prefixClassname("cell-group__title")}`),
    ).not.toBeInTheDocument()
    expect(groups).toHaveLength(2)
    expect(groups[1]).not.toHaveClass(prefixClassname("hairline--top-bottom"))
  })

  it("makes child cells clickable through context", () => {
    const { container } = render(
      <Cell.Group clickable>
        <Cell title="第一项">内容</Cell>
        <Cell title="第二项">内容</Cell>
      </Cell.Group>,
    )
    const cells = container.querySelectorAll(`.${prefixClassname("cell")}`)

    expect(cells).toHaveLength(2)
    expect(cells[0]).toHaveClass(prefixClassname("cell--clickable"))
    expect(cells[1]).toHaveClass(prefixClassname("cell--clickable"))
  })
})
