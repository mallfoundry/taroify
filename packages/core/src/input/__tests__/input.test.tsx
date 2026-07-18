import { act, render } from "@testing-library/react"
import type { BaseEventOrig } from "@tarojs/components/types/common"
import type { InputProps as TaroInputProps } from "@tarojs/components/types/Input"
import * as React from "react"
import Input from "../input"
import type { NativeInputProps } from "../native-input"

let mockNativeInputProps: NativeInputProps

jest.mock("../native-input", () => ({
  __esModule: true,
  default: (props: NativeInputProps) => {
    mockNativeInputProps = props
    return null
  },
}))

describe("<Input />", () => {
  it("should filter non-numeric characters when type is number", () => {
    const onInput = jest.fn()
    const onChange = jest.fn()
    render(<Input type="number" onInput={onInput} onChange={onChange} />)

    const event = {
      type: "input",
      detail: {
        value: "123abc",
      },
    } as BaseEventOrig<TaroInputProps.inputEventDetail>
    let returnedValue: unknown

    act(() => {
      returnedValue = mockNativeInputProps.onInput?.(event)
    })

    expect(returnedValue).toBe("123")
    expect(onInput).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ value: "123" }),
      }),
    )
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ value: "123" }),
      }),
    )
  })
})
