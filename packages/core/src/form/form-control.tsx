import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, isValidElement, ReactElement, ReactNode, useContext, useMemo } from "react"
import Input from "../input"
import { prefixClassname } from "../styles"
import { doFormControlHandler } from "./control"
import FormItemContext from "./form-item.context"
import { FormController } from "./form.shared"

interface FormControlProps extends ViewProps, FormController {
  children?: ReactNode | ((controller: FormController) => ReactNode)
}

function FormControl(props: FormControlProps): JSX.Element {
  const {
    className,
    name,
    value,
    children = <Input />,
    onChange: onDelegatingChange,
    onBlur: onDelegatingBlur,
    ...restProps
  } = props

  const { validateStatus } = useContext(FormItemContext)

  const field = useMemo<ReactNode>(() => {
    if (_.isFunction(children)) {
      return children?.({
        name,
        value,
        validateStatus,
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
        validateStatus,
        onChange: onDelegatingChange,
        onBlur: onDelegatingBlur,
      })
    })
  }, [children, name, onDelegatingBlur, onDelegatingChange, validateStatus, value]) as JSX.Element

  return (
    <View
      className={classNames(prefixClassname("form-control"), className)}
      children={field}
      {...restProps}
    />
  )
}

export default FormControl
