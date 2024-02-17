import * as React from "react"
import { WapHomeOutlined, AppsOutlined, ShoppingCartOutlined, UserOutlined } from "@taroify/icons"
import { render, fireEvent } from "@testing-library/react"
import FixedNav from "../index"
import { prefixClassname } from "../../styles"

const list = [
  {
    id: 1,
    text: "首页",
    icon: <WapHomeOutlined />,
  },
  {
    id: 2,
    text: "分类",
    icon: <AppsOutlined />,
  },
  {
    id: 3,
    text: "购物车",
    icon: <ShoppingCartOutlined />,
  },
  {
    id: 4,
    text: "我的",
    icon: <UserOutlined />,
  },
]

describe("<FixedNav />", () => {
  it("should have default classNames", () => {
    const { container } = render(<FixedNav open={false} data={list} />)
    const el = container.querySelector(`.${prefixClassname("fixed-nav")}`)
    expect(el).toBeInTheDocument()
  })

  it("normal(right) nav", () => {
    const { container } = render(<FixedNav open={false} data={list} />)
    const el = container.querySelector(`.${prefixClassname("fixed-nav")}`)
    expect(el).toHaveClass(`${prefixClassname("fixed-nav--right")}`)
  })

  it("left nav", () => {
    const { container } = render(<FixedNav open={false} data={list} type="left" />)
    const el = container.querySelector(`.${prefixClassname("fixed-nav")}`)
    expect(el).toHaveClass(`${prefixClassname("fixed-nav--left")}`)
  })

  it("should render inactiveText on open as false", () => {
    const { container } = render(
      <FixedNav open={false} data={list} type="left" activeText="收起" inactiveText="展开" />,
    )
    const el = container.querySelector(
      `.${prefixClassname("fixed-nav")} .${prefixClassname("fixed-nav_btn-text")}`,
    )
    expect(el).toHaveTextContent("展开")
  })

  it("should render inactiveText on open change", () => {
    const onChange = jest.fn()
    const { findByText, getByText } = render(
      <FixedNav
        data={list}
        type="left"
        activeText="收起"
        inactiveText="展开"
        onChange={onChange}
      />,
    )
    fireEvent.click(getByText(/展开/i))
    expect(onChange).toHaveBeenCalledTimes(1)
    findByText("收起")
  })
})
