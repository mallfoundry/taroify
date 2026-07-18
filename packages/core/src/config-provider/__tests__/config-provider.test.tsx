import { render } from "@testing-library/react"
import * as React from "react"
import ConfigProvider from "../config-provider"

describe("<ConfigProvider />", () => {
  it("converts custom theme variables to CSS variables", () => {
    const { container } = render(
      <ConfigProvider theme={{ primaryColor: "#07c160", fontSizeMd: "16px" }}>
        content
      </ConfigProvider>,
    )
    const root = container.firstElementChild as HTMLElement

    expect(root.style.getPropertyValue("--primary-color")).toBe("#07c160")
    expect(root.style.getPropertyValue("--font-size-md")).toBe("16px")
    expect(root.style.colorScheme).toBe("light")
  })

  it("applies the dark theme variables", () => {
    const { container } = render(<ConfigProvider themeMode="dark">content</ConfigProvider>)
    const root = container.firstElementChild as HTMLElement

    expect(root.style.getPropertyValue("--text-color")).toBe("#f7f7f7")
    expect(root.style.getPropertyValue("--text-color-2")).toBe("#d2d5d8")
    expect(root.style.getPropertyValue("--text-color-3")).toBe("#adb0b5")
    expect(root.style.getPropertyValue("--background-color")).toBe("#101010")
    expect(root.style.getPropertyValue("--background-color-2")).toBe("#1c1c1e")
    expect(root.style.getPropertyValue("--border-color")).toBe("#3a3a3c")
    expect(root.style.colorScheme).toBe("dark")
  })

  it("allows custom variables to override the dark theme", () => {
    const { container } = render(
      <ConfigProvider
        themeMode="dark"
        theme={{ backgroundColor2: "#121212", textColor: "#eeeeee" }}
      >
        content
      </ConfigProvider>,
    )
    const root = container.firstElementChild as HTMLElement

    expect(root.style.getPropertyValue("--background-color-2")).toBe("#121212")
    expect(root.style.getPropertyValue("--text-color")).toBe("#eeeeee")
  })

  it("removes dark theme variables after switching to light mode", () => {
    const { container, rerender } = render(
      <ConfigProvider themeMode="dark">content</ConfigProvider>,
    )
    const root = container.firstElementChild as HTMLElement

    rerender(<ConfigProvider themeMode="light">content</ConfigProvider>)

    expect(root.style.getPropertyValue("--background-color")).toBe("")
    expect(root.style.getPropertyValue("--text-color")).toBe("")
    expect(root.style.colorScheme).toBe("light")
  })
})
