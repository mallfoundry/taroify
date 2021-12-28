import {
  Input as TaroInput,
  Switch as TaroSwitch,
  Textarea as TaroTextarea,
} from "@tarojs/components"
import { InputProps } from "@tarojs/components/types/Input"
import { SwitchProps as TaroSwitchProps } from "@tarojs/components/types/Switch"
import { cloneElement, ReactElement, ReactNode } from "react"
import Input from "../../input"
import Switch, { SwitchProps } from "../../switch"
import { FormController } from "../form.shared"
import FormControlHandler, { registerFormControlHandler } from "./form-control-handler"

registerFormControlHandler(
  new (class implements FormControlHandler<InputProps> {
    doControlRender(element: ReactElement<InputProps>, controller: FormController): ReactNode {
      const { name, value, onBlur: onDelegatingBlur, onChange: onDelegatingChange } = controller
      const { props: elementProps } = element
      const { onBlur, onInput } = elementProps
      return cloneElement<InputProps>(element, {
        name,
        value,
        onInput: (e) => {
          onInput?.(e)
          onDelegatingChange?.(e.detail.value)
        },
        onBlur: (e) => {
          onBlur?.(e)
          onDelegatingBlur?.(e.detail.value)
        },
      })
    }

    supportsControlType(elementType: any): boolean {
      return elementType === TaroInput || elementType === TaroTextarea || elementType === Input
    }
  })(),
)

registerFormControlHandler(
  new (class implements FormControlHandler<TaroSwitchProps> {
    doControlRender(element: ReactElement<TaroSwitchProps>, controller: FormController): ReactNode {
      const { name, value, onChange: onDelegatingChange } = controller
      const { props: elementProps } = element
      const { onChange } = elementProps
      return cloneElement<TaroSwitchProps>(element, {
        name,
        checked: value,
        onChange: (e) => {
          onChange?.(e)
          onDelegatingChange?.(e.detail.value)
        },
      })
    }

    supportsControlType(elementType: any): boolean {
      return elementType === TaroSwitch
    }
  })(),
)

registerFormControlHandler(
  new (class implements FormControlHandler<SwitchProps> {
    doControlRender(element: ReactElement<SwitchProps>, controller: FormController): ReactNode {
      const { value, onChange: onDelegatingChange } = controller
      const { props: elementProps } = element
      const { onChange } = elementProps
      return cloneElement<SwitchProps>(element, {
        checked: value,
        onChange: (checked) => {
          onChange?.(checked)
          onDelegatingChange?.(checked)
        },
      })
    }

    supportsControlType(elementType: any): boolean {
      return elementType === Switch
    }
  })(),
)
