import { render } from "@testing-library/react"
import * as React from "react"
import { prefixClassname } from "../../styles"
import { HAIRLINE_BOTTOM } from "../../styles/hairline"
import Navbar from "../navbar"

describe("<Navbar />", () => {
  // The default button contains prefix-navbar
  it("should have default classNames", () => {
    const { container } = render(<Navbar />)
    const el = container.querySelector(`.${prefixClassname("navbar")}`)
    expect(el).toHaveClass(prefixClassname("navbar"))
  })

  it("should have hairline--bottom of classNames", () => {
    const { container } = render(<Navbar bordered />)
    const el = container.querySelector(`.${prefixClassname("navbar")}`)
    expect(el).toHaveClass(HAIRLINE_BOTTOM)
  })
})
