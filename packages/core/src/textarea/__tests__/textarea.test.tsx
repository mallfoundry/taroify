import { act, render } from "@testing-library/react"
import type { BaseEventOrig } from "@tarojs/components/types/common"
import type { InputProps as TaroInputProps } from "@tarojs/components/types/Input"
import * as React from "react"
import type { NativeTextareaProps } from "../native-textarea"
import Textarea from "../textarea"

let mockNativeTextareaProps: NativeTextareaProps

jest.mock(
  "@taroify/hooks",
  () => {
    const React = jest.requireActual("react")

    return {
      useUncontrolled: ({ value }: { value?: string }) => {
        const [internalValue, setInternalValue] = React.useState(value)
        return {
          value: value === undefined ? internalValue : value,
          setValue: setInternalValue,
        }
      },
    }
  },
  { virtual: true },
)

jest.mock("@tarojs/components", () => ({
  View: "div",
}))

jest.mock("../native-textarea", () => ({
  __esModule: true,
  default: (props: NativeTextareaProps) => {
    mockNativeTextareaProps = props
    return null
  },
}))

function createInputEvent(value: string) {
  return {
    type: "input",
    detail: {
      value,
    },
  } as BaseEventOrig<TaroInputProps.inputEventDetail>
}

describe("<Textarea />", () => {
  it("should truncate values exceeding a numeric limit", () => {
    const onInput = jest.fn()
    const onChange = jest.fn()
    const event = createInputEvent("1234")
    render(<Textarea limit={3} onInput={onInput} onChange={onChange} />)

    act(() => {
      mockNativeTextareaProps.onInput?.(event)
    })

    expect(mockNativeTextareaProps.maxlength).toBe(3)
    expect(mockNativeTextareaProps.value).toBe("123")
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
    expect(event.detail.value).toBe("1234")
  })

  it("should preserve the original event when the value is within the limit", () => {
    const onInput = jest.fn()
    const onChange = jest.fn()
    const event = createInputEvent("123")
    render(<Textarea limit={3} onInput={onInput} onChange={onChange} />)

    act(() => {
      mockNativeTextareaProps.onInput?.(event)
    })

    expect(onInput).toHaveBeenCalledWith(event)
    expect(onChange).toHaveBeenCalledWith(event)
  })

  it.each([
    ["emoji", "a😀b", 3, "a😀"],
    ["combining characters", "e\u0301x", 1, "e\u0301"],
  ])("should safely truncate %s", (_, inputValue, limit, expectedValue) => {
    const event = createInputEvent(inputValue)
    render(<Textarea limit={limit} />)

    act(() => {
      mockNativeTextareaProps.onInput?.(event)
    })

    expect(mockNativeTextareaProps.value).toBe(expectedValue)
  })

  it("should emit the truncated value in controlled mode", () => {
    const onChange = jest.fn()
    const event = createInputEvent("1234")
    render(<Textarea limit={3} value="12" onChange={onChange} />)

    act(() => {
      mockNativeTextareaProps.onInput?.(event)
    })

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ value: "123" }),
      }),
    )
  })

  it.each([
    ["boolean limit", { limit: true, maxlength: 3 }],
    ["unlimited numeric limit", { limit: -1 }],
    ["native maxlength", { maxlength: 3 }],
  ])("should preserve native behavior for %s", (_, props) => {
    const event = createInputEvent("1234")
    render(<Textarea {...props} />)

    act(() => {
      mockNativeTextareaProps.onInput?.(event)
    })

    expect(mockNativeTextareaProps.value).toBe("1234")
  })
})
