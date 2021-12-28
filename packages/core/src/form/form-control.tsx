import * as _ from "lodash"
import * as React from "react"
import { Children, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import Input from "../input"
import { doFormControlHandler } from "./control"
import { FormController } from "./form.shared"

interface FormControlProps extends FormController {
  name?: string
  value?: any
  children?: ReactNode | ((controller: FormController) => ReactNode)

  onChange?(value: any): void

  onBlur?(value: any): void
}

function FormControl(props: FormControlProps): JSX.Element {
  const {
    name,
    value,
    children = <Input />,
    onChange: onDelegatingChange,
    onBlur: onDelegatingBlur,
  } = props

  return useMemo<ReactNode>(() => {
    if (_.isFunction(children)) {
      return children?.({
        name,
        value,
        onChange: onDelegatingChange,
        onBlur: onDelegatingBlur,
      })
    }

    return Children.map(children, (child: ReactNode) => {
      if (!isValidElement(child)) {
        return child
      }
      const element = child as ReactElement
      return doFormControlHandler(element, {
        name,
        value,
        onChange: onDelegatingChange,
        onBlur: onDelegatingBlur,
      })
    })
  }, [children, name, onDelegatingBlur, onDelegatingChange, value]) as JSX.Element
}

export default FormControl
