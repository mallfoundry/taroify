import { render } from "@testing-library/react"
import * as React from "react"
import VanIcon from "../VanIcon"

describe("<VanIcon />", () => {
  it("should not add inherit modifier when using preset color", () => {
    const { container } = render(<VanIcon name="success" color="success" />)
    const el = container.firstChild as HTMLElement

    expect(el).toHaveClass("taroify-icon--success")
    expect(el).not.toHaveClass("taroify-icon--inherit")
  })

  it("should keep preset size modifier without inherit modifier", () => {
    const { container } = render(<VanIcon name="success" size="small" color="success" />)
    const el = container.firstChild as HTMLElement

    expect(el).toHaveClass("taroify-icon--success")
    expect(el).toHaveClass("taroify-icon--small")
    expect(el).not.toHaveClass("taroify-icon--inherit")
  })
})
