import { render } from "@testing-library/react"
import * as React from "react"
import SafeArea from "../safe-area"
import { prefixClassname } from "../../styles"

jest.mock("../../utils/base", () => ({
  inBrowser: true,
}))

describe("<SafeArea /> in browser", () => {
  it("renders in browser without position", () => {
    const { container } = render(<SafeArea>内容</SafeArea>)

    expect(container.querySelector(`.${prefixClassname("safe-area")}`)).not.toBeNull()
    expect(container.querySelector(`.${prefixClassname("safe-area--top")}`)).toBeNull()
    expect(container.querySelector(`.${prefixClassname("safe-area--bottom")}`)).toBeNull()
    const styles = getComputedStyle(container.firstChild as Element)
    expect(Boolean(styles.paddingTop)).toBe(false)
    expect(Boolean(styles.paddingBottom)).toBe(false)
    expect(container).toMatchSnapshot()
  })

  it("renders top in browser", () => {
    const { container } = render(<SafeArea position="top">顶部安全区</SafeArea>)

    expect(container.querySelector(`.${prefixClassname("safe-area--top")}`)).not.toBeNull()
    expect(container.firstChild).toHaveStyle({
      paddingTop: expect.stringMatching(/^(env|constant)\(safe-area-inset-top\)$/),
    })
    const styles = getComputedStyle(container.firstChild as Element)
    expect(Boolean(styles.paddingBottom)).toBe(false)

    expect(container).toMatchSnapshot()
  })

  it("renders bottom in browser", () => {
    const { container } = render(<SafeArea position="bottom">底部安全区</SafeArea>)

    expect(container.querySelector(`.${prefixClassname("safe-area--bottom")}`)).not.toBeNull()
    expect(container.firstChild).toHaveStyle({
      paddingBottom: expect.stringMatching(/^(env|constant)\(safe-area-inset-bottom\)$/),
    })
    const styles = getComputedStyle(container.firstChild as Element)
    expect(Boolean(styles.paddingTop)).toBe(false)

    expect(container).toMatchSnapshot()
  })
})
