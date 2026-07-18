import { fireEvent, render, waitFor } from "@testing-library/react"
import * as React from "react"
import { prefixClassname } from "../../styles"
import Tour from "../tour"

jest.mock("@tarojs/taro", () => ({
  createSelectorQuery: jest.fn(),
  getEnv: () => "WEB",
  getWindowInfo: () => ({ windowWidth: 375, windowHeight: 667 }),
  nextTick: (callback: () => void) => callback(),
  usePageScroll: () => {},
}))

function createRect(top: number, left: number, width: number, height: number): DOMRect {
  return {
    x: left,
    y: top,
    top,
    left,
    right: left + width,
    bottom: top + height,
    width,
    height,
    toJSON: () => ({}),
  }
}

describe("<Tour />", () => {
  beforeEach(() => {
    jest.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (
      this: Element,
    ) {
      if (this.classList.contains(prefixClassname("tour__popover"))) {
        return createRect(0, 0, 200, 120)
      }
      if (this.id === "tour-target-2") {
        return createRect(200, 220, 80, 40)
      }
      return createRect(100, 100, 100, 40)
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("highlights the target and positions the popover", async () => {
    const { container } = render(
      <>
        <div id="tour-target-1">目标</div>
        <Tour open type="tile" list={[{ target: "tour-target-1", content: "引导内容" }]} />
      </>,
    )

    const highlight = await waitFor(() => {
      const element = container.querySelector(
        `.${prefixClassname("tour__highlight")}`,
      ) as HTMLElement
      expect(element).toBeInTheDocument()
      return element
    })
    const popover = container.querySelector(`.${prefixClassname("tour__popover")}`) as HTMLElement

    expect(highlight).toHaveStyle({
      top: "92px",
      left: "90px",
      width: "120px",
      height: "56px",
    })
    await waitFor(() => {
      expect(popover).toHaveClass(prefixClassname("tour__popover--ready"))
      expect(popover).toHaveStyle({ top: "160px", left: "50px" })
    })
    expect(container).toHaveTextContent("引导内容")
  })

  it("changes steps and completes the tour", async () => {
    const onChange = jest.fn()
    const onClose = jest.fn()
    const { container, getByText } = render(
      <>
        <div id="tour-target-1">目标一</div>
        <div id="tour-target-2">目标二</div>
        <Tour
          open
          title="功能介绍"
          list={[
            { target: "tour-target-1", content: "第一步" },
            { target: "tour-target-2", content: "第二步" },
          ]}
          onChange={onChange}
          onClose={onClose}
        />
      </>,
    )

    await waitFor(() => {
      expect(container).toHaveTextContent("第一步")
    })
    fireEvent.click(getByText("下一步"))

    await waitFor(() => {
      expect(container).toHaveTextContent("第二步")
      expect(container).toHaveTextContent("2/2")
    })
    expect(onChange).toHaveBeenCalledWith(1)
    expect(getByText("上一步")).toBeInTheDocument()

    fireEvent.click(getByText("完成"))
    expect(onClose).toHaveBeenCalledWith(false, expect.anything())
  })

  it("closes after clicking the overlay", async () => {
    const onClose = jest.fn()
    const { container } = render(
      <>
        <div id="tour-target-1">目标</div>
        <Tour
          defaultOpen
          list={[{ target: "tour-target-1", content: "引导内容" }]}
          onClose={onClose}
        />
      </>,
    )

    await waitFor(() => {
      expect(container.querySelector(`.${prefixClassname("tour")}`)).toBeInTheDocument()
    })
    fireEvent.click(container.querySelector(`.${prefixClassname("tour__overlay")}`) as HTMLElement)

    expect(onClose).toHaveBeenCalledWith(false, expect.anything())
    expect(container.querySelector(`.${prefixClassname("tour")}`)).not.toBeInTheDocument()
  })
})
