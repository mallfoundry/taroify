import { render } from "@testing-library/react"
import * as React from "react"
import SafeArea from "../safe-area"
import { prefixClassname } from "../../styles"
import * as Taro from "@tarojs/taro"

jest.mock("@tarojs/taro", () => ({
  getSystemInfoSync: jest.fn(),
}))

jest.mock("../../utils/base", () => ({
  inBrowser: false,
}))

const mockSystemInfo: Taro.getSystemInfoSync.Result = {
  SDKVersion: "3.6.2",
  benchmarkLevel: 1,
  bluetoothEnabled: true,
  brand: "devtools",
  cameraAuthorized: true,
  deviceOrientation: "portrait",
  enableDebug: false,
  fontSizeSetting: 16,
  host: { appId: "WeChat" },
  language: "zh_CN",
  locationAuthorized: true,
  locationEnabled: true,
  microphoneAuthorized: true,
  model: "iPhone X",
  notificationAuthorized: true,
  pixelRatio: 3,
  platform: "devtools",
  safeArea: { top: 44, left: 0, right: 375, bottom: 778, width: 375, height: 734 },
  screenHeight: 812,
  screenWidth: 375,
  statusBarHeight: 44,
  system: "iOS 10.0.1",
  version: "8.0.5",
  wifiEnabled: true,
  windowHeight: 812,
  windowWidth: 375,
}

describe("<SafeArea /> in non-browser environment", () => {
  it("renders in non-browser environment without position", () => {
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
    jest.spyOn(Taro, "getSystemInfoSync").mockReturnValue(mockSystemInfo)

    const { container } = render(<SafeArea position="top">顶部安全区</SafeArea>)
    expect(container.querySelector(`.${prefixClassname("safe-area--top")}`)).toBeNull()
    expect(container.querySelector(`.${prefixClassname("safe-area--bottom")}`)).toBeNull()

    const styles = getComputedStyle(container.firstChild as Element)
    expect(styles.paddingTop).toBe("44px")
    expect(Boolean(styles.paddingBottom)).toBe(false)

    expect(container).toMatchSnapshot()
  })

  it("renders bottom in non-browser environment", () => {
    jest.spyOn(Taro, "getSystemInfoSync").mockReturnValue(mockSystemInfo)

    const { container } = render(<SafeArea position="bottom">底部安全区</SafeArea>)
    expect(container.querySelector(`.${prefixClassname("safe-area--top")}`)).toBeNull()
    expect(container.querySelector(`.${prefixClassname("safe-area--bottom")}`)).toBeNull()

    const styles = getComputedStyle(container.firstChild as Element)
    expect(styles.paddingBottom).toBe("34px")
    expect(Boolean(styles.paddingTop)).toBe(false)

    expect(container).toMatchSnapshot()
  })
})
