import { render } from "@testing-library/react"
import * as React from "react"
import { prefixClassname } from "../../styles"
import DropdownMenu from "../dropdown-menu"
import DropdownMenuItem from "../dropdown-menu-item"

jest.mock("@tarojs/taro", () => ({
  getWindowInfo: () => ({ windowHeight: 667 }),
  nextTick: (callback: () => void) => callback(),
  usePageScroll: () => {},
}))

jest.mock("../dropdown-menu-item", () => ({
  __esModule: true,
  default: () => null,
}))

jest.mock("../dropdown-menu-option", () => ({
  __esModule: true,
  default: () => null,
}))

describe("<DropdownMenu />", () => {
  it("should control title ellipsis", () => {
    const title = "默认排序"
    const { container, rerender } = render(
      <DropdownMenu>
        <DropdownMenuItem title={title} />
      </DropdownMenu>,
    )

    expect(container.querySelector(`.${prefixClassname("ellipsis")}`)).toHaveTextContent(title)

    rerender(
      <DropdownMenu ellipsis={false}>
        <DropdownMenuItem title={title} />
      </DropdownMenu>,
    )

    expect(container.querySelector(`.${prefixClassname("ellipsis")}`)).not.toBeInTheDocument()
    expect(container).toHaveTextContent(title)
  })
})
