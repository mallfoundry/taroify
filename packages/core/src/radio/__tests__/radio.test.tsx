import { fireEvent, render } from "@testing-library/react"
import * as React from "react"
import { prefixClassname } from "../../styles"
import Radio from "../index"

describe("<Radio />", () => {
  it("renders button shape without the radio icon", () => {
    const { container } = render(
      <Radio.Group defaultValue="a">
        <Radio name="a" shape="button">
          单选框
        </Radio>
      </Radio.Group>,
    )

    expect(container.querySelector(`.${prefixClassname("radio__button")}`)).toHaveClass(
      prefixClassname("radio__button--checked"),
    )
    expect(container.querySelector(`.${prefixClassname("radio__icon")}`)).toBeNull()
  })

  it("updates a button radio group after clicking an option", () => {
    const onChange = jest.fn()
    const { container } = render(
      <Radio.Group defaultValue="a" onChange={onChange}>
        <Radio name="a" shape="button">
          单选框 a
        </Radio>
        <Radio name="b" shape="button">
          单选框 b
        </Radio>
      </Radio.Group>,
    )

    const radios = container.querySelectorAll(`.${prefixClassname("radio")}`)
    const buttons = container.querySelectorAll(`.${prefixClassname("radio__button")}`)

    expect(buttons[0]).toHaveClass(prefixClassname("radio__button--checked"))
    expect(buttons[1]).not.toHaveClass(prefixClassname("radio__button--checked"))

    fireEvent.click(radios[1])

    expect(onChange).toHaveBeenCalledWith("b")
    expect(buttons[0]).not.toHaveClass(prefixClassname("radio__button--checked"))
    expect(buttons[1]).toHaveClass(prefixClassname("radio__button--checked"))
  })

  it("does not update a disabled button radio", () => {
    const onChange = jest.fn()
    const { container } = render(
      <Radio.Group defaultValue="a" onChange={onChange}>
        <Radio name="a" shape="button" disabled>
          单选框
        </Radio>
      </Radio.Group>,
    )

    const radio = container.querySelector(`.${prefixClassname("radio")}`)
    const button = container.querySelector(`.${prefixClassname("radio__button")}`)

    expect(radio).toHaveClass(prefixClassname("radio--disabled"))
    expect(button).toHaveClass(
      prefixClassname("radio__button--checked"),
      prefixClassname("radio__button--disabled"),
    )

    if (!radio) throw new Error("Radio element not found")
    fireEvent.click(radio)

    expect(onChange).not.toHaveBeenCalled()
  })
})
