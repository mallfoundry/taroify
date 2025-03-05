import { render } from "@testing-library/react"
import * as React from "react"
import { prefixClassname } from "../../styles"
import { HAIRLINE_BORDER_BOTTOM } from "../../styles/hairline"
import Navbar from "../navbar"
import NavBarLeft from "../navbar-left"
import NavBarRight from "../navbar-right"
import NavBarTitle from "../navbar-title"
import { ArrowLeft as Icon } from "@taroify/icons"
import { Text } from "@tarojs/components"

describe("<Navbar />", () => {
  // The default button contains prefix-navbar
  it("should have default classNames", () => {
    const { container } = render(<Navbar />)
    const el = container.querySelector(`.${prefixClassname("navbar")}`)
    expect(el).toBeInTheDocument()
  })

  it("should have hairline--bottom of classNames", () => {
    const { container } = render(<Navbar bordered />)
    const el = container.querySelector(`.${prefixClassname("navbar")}`)
    expect(el).toHaveClass(HAIRLINE_BORDER_BOTTOM)
  })

  it("should render fixed navbar with placeholder", () => {
    const { container } = render(<Navbar fixed placeholder />)
    const el = container.querySelector(`.${prefixClassname("fixed-view__placeholder")}`)
    expect(el).toBeInTheDocument()
  })

  it("should render navbar with left, right and title", async () => {
    const { container, findByText } = render(
      <Navbar>
        <NavBarLeft className="navbar-left">Left Content</NavBarLeft>
        <NavBarRight className="navbar-right">Right Content</NavBarRight>
        <NavBarTitle className="navbar-title">Title</NavBarTitle>
        {/* To Cover the Else Case */}
        <Text>Normal</Text>
        {/* To Cover the case where node might not be a react node */}
        Text
      </Navbar>,
    )
    expect(container.querySelector(`.${prefixClassname("navbar")}`)).toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("navbar__content")}`)).toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("navbar__left")}`)).toBeInTheDocument()
    expect(await findByText("Left Content")).toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("navbar__right")}`)).toBeInTheDocument()
    expect(await findByText("Right Content")).toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("navbar__title")}`)).toBeInTheDocument()
    expect(await findByText("Title")).toBeInTheDocument()
  })

  it("should render navbar with icon on left and right", () => {
    const { container } = render(
      <Navbar>
        <NavBarLeft className="navbar-left">
          <Icon className="arrow-left-icon" size={20} />
        </NavBarLeft>
        <NavBarRight icon="Hello" className="navbar-right">
          <Icon className="arrow-right-icon" size={20} />
        </NavBarRight>
        <NavBarTitle className="navbar-title" />
      </Navbar>,
    )
    expect(container.querySelector(`.${prefixClassname("navbar")}`)).toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("navbar__content")}`)).toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("navbar__left")}`)).toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("navbar__right")}`)).toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("navbar__title")}`)).toBeInTheDocument()
    expect(container.querySelector(".arrow-left-icon")).toHaveStyle("font-size: 20px")
    expect(container.querySelector(".arrow-right-icon")).toHaveStyle("font-size: 20px")
  })
})
