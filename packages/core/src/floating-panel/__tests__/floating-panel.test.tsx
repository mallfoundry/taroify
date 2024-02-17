import * as React from "react"
import { render, fireEvent } from "@testing-library/react"
import FloatingPanel from "../index"
import { prefixClassname } from "../../styles"
import { sleep } from "../../utils/sleep"

describe("<FloatingPanel />", () => {
  it("should drag adsorption effect when anchors props is [100, 200, 400]", async () => {
    const { container, asFragment } = render(
      <FloatingPanel anchors={[100, 200, 400]}>内容</FloatingPanel>,
    )

    const el = container.querySelector(`.${prefixClassname("floating-panel")}`) as HTMLDivElement

    expect(asFragment()).toMatchSnapshot()

    expect(el.style.height).toBe("400px")

    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] })
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: 10 }] })
    fireEvent.touchEnd(el)
    await sleep(0)
    expect(el.style.transform).toContain("-100px")

    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] })
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: -49 }] })
    fireEvent.touchEnd(el)
    await sleep(0)
    expect(el.style.transform).toContain("-100px")

    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] })
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: -199 }] })
    fireEvent.touchEnd(el)
    await sleep(0)
    expect(el.style.transform).toContain("-200px")

    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] })
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: -200 }] })
    fireEvent.touchEnd(el)
    await sleep(0)
    expect(el.style.transform).toContain("-400px")

    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] })
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: -500 }] })
    fireEvent.touchEnd(el)
    await sleep(0)
    expect(el.style.transform).toContain("-400px")
  })

  it("should emit height-change when height change in anchors", async () => {
    const onChange = jest.fn()
    const { container } = render(
      <FloatingPanel anchors={[100, 200, 400]} handleChange={onChange}>
        内容
      </FloatingPanel>,
    )
    const el = container.querySelector(`.${prefixClassname("floating-panel")}`) as HTMLDivElement
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] })
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: -199 }] })
    fireEvent.touchEnd(el)
    await sleep(0)
    expect(el.style.transform).toContain("-200px")
    expect(onChange).toBeCalledWith(299)
  })

  it("should only drag header when allowDraggingContent is false", async () => {
    const onChange = jest.fn()
    const { container } = render(
      <FloatingPanel anchors={[100, 200, 400]} contentDraggable={false} handleChange={onChange}>
        内容
      </FloatingPanel>,
    )
    const el = container.querySelector(
      `.${prefixClassname("floating-panel__content")}`,
    ) as HTMLDivElement
    fireEvent.touchStart(el, { touches: [{ clientX: 0, clientY: 0 }] })
    fireEvent.touchMove(el, { touches: [{ clientX: 0, clientY: -199 }] })
    fireEvent.touchEnd(el)
    await sleep(0)
    expect(onChange).not.toHaveBeenCalled()

    const elHeader = container.querySelector(
      `.${prefixClassname("floating-panel__header")}`,
    ) as HTMLDivElement
    fireEvent.touchStart(elHeader, { touches: [{ clientX: 0, clientY: 0 }] })
    fireEvent.touchMove(elHeader, { touches: [{ clientX: 0, clientY: -199 }] })
    fireEvent.touchEnd(elHeader)
    await sleep(0)
    expect(onChange).toBeTruthy()
  })
})
