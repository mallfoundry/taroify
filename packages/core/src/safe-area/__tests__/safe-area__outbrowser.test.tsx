import { render } from "@testing-library/react"
import * as React from "react"
import SafeArea from "../safe-area"
import { prefixClassname } from "../../styles"
import * as Taro from "@tarojs/taro"

jest.mock("@tarojs/taro", () => ({
  getWindowInfo: jest.fn(),
}))

jest.mock("../../utils/base", () => ({
  inBrowser: false,
}))

const mockSystemInfo: Taro.getWindowInfo.Result = {
  pixelRatio: 3,
  safeArea: { top: 44, left: 0, right: 375, bottom: 778, width: 375, height: 734 },
  screenHeight: 812,
  screenWidth: 375,
  statusBarHeight: 44,
  windowHeight: 812,
  windowWidth: 375,
}

describe("<SafeArea /> in non-browser environment", () => {
  it("renders in non-browser environment without position", () => {
    jest.spyOn(Taro, "getWindowInfo").mockReturnValue(mockSystemInfo)

    const { container } = render(<SafeArea>内容</SafeArea>)

    expect(container.querySelector(`.${prefixClassname("safe-area")}`)).not.toBeNull()
    expect(container.querySelector(`.${prefixClassname("safe-area--top")}`)).toBeNull()
    expect(container.querySelector(`.${prefixClassname("safe-area--bottom")}`)).toBeNull()
    const styles = getComputedStyle(container.firstChild as Element)
    expect(Boolean(styles.paddingTop)).toBe(false)
    expect(Boolean(styles.paddingBottom)).toBe(false)
    expect(container).toMatchSnapshot()
  })

  it("renders top in non-browser environment", () => {
    jest.spyOn(Taro, "getWindowInfo").mockReturnValue(mockSystemInfo)

    const { container } = render(
      <SafeArea position="top" nativeSafeTop>
        顶部安全区
      </SafeArea>,
    )
    expect(container.querySelector(`.${prefixClassname("safe-area--top")}`)).not.toBeNull()
    expect(container.querySelector(`.${prefixClassname("safe-area--bottom")}`)).toBeNull()

    const styles = getComputedStyle(container.firstChild as Element)
    expect(styles.paddingTop).toBe("44px")
    expect(Boolean(styles.paddingBottom)).toBe(false)

    expect(container).toMatchSnapshot()
  })

  it("renders bottom in non-browser environment", () => {
    jest.spyOn(Taro, "getWindowInfo").mockReturnValue(mockSystemInfo)

    const { container } = render(<SafeArea position="bottom">底部安全区</SafeArea>)
    expect(container.querySelector(`.${prefixClassname("safe-area--top")}`)).toBeNull()
    expect(container.querySelector(`.${prefixClassname("safe-area--bottom")}`)).not.toBeNull()

    const styles = getComputedStyle(container.firstChild as Element)
    expect(styles.paddingBottom).toBe("")
    expect(Boolean(styles.paddingTop)).toBe(false)

    expect(container).toMatchSnapshot()
  })
})
