import * as React from "react"
import { render } from "@testing-library/react"
import FloatingPanel from "../index"
import { prefixClassname } from "../../styles"
import { touchEvent, sleep } from "../../../test"

describe("<FloatingPanel />", () => {
  it("should drag adsorption effect when anchors props is [100, 200, 400]", async () => {
    const { container, asFragment } = render(
      <FloatingPanel anchors={[100, 200, 400]}>内容</FloatingPanel>,
    )

    const el = container.querySelector(`.${prefixClassname("floating-panel")}`) as HTMLDivElement

    expect(asFragment()).toMatchSnapshot()

    expect(el.style.height).toBe("400px")

    // drag 10
    touchEvent(el, 0, 10)
    await sleep(0)
    expect(el.style.transform).toContain("-100px")

    // drag -49
    touchEvent(el, 0, -49)
    await sleep(0)
    expect(el.style.transform).toContain("-100px")

    // drag -199
    touchEvent(el, 0, -199)
    await sleep(0)
    expect(el.style.transform).toContain("-200px")

    // drag -200
    touchEvent(el, 0, -200)
    await sleep(0)
    expect(el.style.transform).toContain("-400px")

    // drag -500
    touchEvent(el, 0, -500)
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
    touchEvent(el, 0, -199)
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
    touchEvent(el, 0, -199)
    await sleep(0)
    expect(onChange).not.toHaveBeenCalled()

    const elHeader = container.querySelector(
      `.${prefixClassname("floating-panel__header")}`,
    ) as HTMLDivElement
    touchEvent(elHeader, 0, -199)
    await sleep(0)
    expect(onChange).toBeTruthy()
  })
})
