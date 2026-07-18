import type { TaroNode } from "@tarojs/runtime"
import { createRoot } from "react-dom/client"
import { mountPortal, unmountPortal } from "../portal"

jest.mock("@tarojs/taro", () => ({
  getCurrentPages: () => [{ route: "pages/index/index" }],
  getCurrentInstance: () => undefined,
}))

jest.mock("@tarojs/runtime", () => ({
  document: global.document,
}))

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
    unmount: jest.fn(),
  })),
}))

const createRootMock = createRoot as jest.MockedFunction<typeof createRoot>

describe("portal", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    document.body.innerHTML = '<div id="pages/index/index"></div>'
  })

  it("should mount with the platform ReactDOM renderer", () => {
    const children = {} as TaroNode
    const view = document.createElement("div") as unknown as TaroNode

    mountPortal(children, view)

    expect(createRoot).toHaveBeenCalledWith(view)
    expect(createRootMock.mock.results[0].value.render).toHaveBeenCalledWith(children)
    expect(document.getElementById("pages/index/index")?.contains(view as unknown as Node)).toBe(
      true,
    )
  })

  it("should unmount and remove the portal view", () => {
    const view = document.createElement("div") as unknown as TaroNode
    mountPortal({} as TaroNode, view)
    const root = createRootMock.mock.results[0].value

    unmountPortal(view)

    expect(root.unmount).toHaveBeenCalled()
    expect(document.body.contains(view as unknown as Node)).toBe(false)
  })
})
