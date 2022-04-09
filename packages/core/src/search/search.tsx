import { Search as SearchIcon } from "@taroify/icons"
import { ITouchEvent, View } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { InputProps } from "@tarojs/components/types/Input"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactElement, ReactNode, ReactText } from "react"
import Field from "../field"
import { FormFeedbackProps } from "../form"
import Input, { InputAlign, InputClearTrigger, InputColor } from "../input"
import { prefixClassname } from "../styles"
import { preventDefault } from "../utils/dom/event"
import { getLogger } from "../utils/logger"
import { SearchShape } from "./search.shared"

const { deprecated } = getLogger("Search")

interface SearchProps extends ViewProps {
  className?: string
  value?: string
  icon?: ReactNode
  rightIcon?: ReactNode
  label?: ReactNode
  shape?: SearchShape
  maxlength?: number
  autoFocus?: boolean
  focus?: boolean
  disabled?: boolean
  readonly?: boolean

  placeholder?: string
  placeholderClassName?: string

  inputAlign?: InputAlign
  inputColor?: InputColor

  clearable?: boolean
  clearIcon?: ReactNode
  clearTrigger?: InputClearTrigger

  feedback?: ReactText | FormFeedbackProps | ReactElement
  action?: boolean | ReactNode

  onClear?(event: ITouchEvent): void

  onCancel?(event: ITouchEvent): void

  onSearch?(event: BaseEventOrig<InputProps.inputValueEventDetail>): void

  onChange?(event: BaseEventOrig<InputProps.inputEventDetail>): void

  onFocus?(event: BaseEventOrig<InputProps.inputForceEventDetail>): void

  onBlur?(event: BaseEventOrig<InputProps.inputValueEventDetail>): void
}

function Search(props: SearchProps) {
  const {
    className,
    value,
    icon = <SearchIcon />,
    rightIcon,
    label,
    shape,
    maxlength,
    autoFocus,
    focus,
    disabled,
    readonly,
    //
    placeholder,
    placeholderClassName,
    clearable = true,
    clearIcon,
    clearTrigger,
    inputAlign,
    inputColor,
    feedback,
    action,
    //
    onClear,
    onCancel,
    onSearch,
    onChange,
    onFocus,
    onBlur,
    ...restProps
  } = props

  if (shape === "round") {
    // eslint-disable-next-line quotes
    deprecated('Use the shape="rounded" prop instead of the shape="round" prop')
  }

  function handleSearch(event: BaseEventOrig<InputProps.inputValueEventDetail>) {
    preventDefault(event)
    onSearch?.(event)
  }

  return (
    <View
      className={classNames(
        prefixClassname("search"),
        {
          [prefixClassname("search--action")]: action,
        },
        className,
      )}
      {...restProps}
    >
      <View
        className={classNames(prefixClassname("search__content"), {
          [prefixClassname("search__content--square")]: shape === "square",
          [prefixClassname("search__content--rounded")]: shape === "rounded" || shape === "round",
        })}
      >
        {label && <View className={prefixClassname("search__label")} children={label} />}
        <Field
          className={prefixClassname("search__field")}
          icon={icon}
          rightIcon={rightIcon}
          feedback={feedback}
        >
          <Input
            className={prefixClassname("search__input")}
            placeholderClassName={placeholderClassName}
            value={value}
            maxlength={maxlength}
            placeholder={placeholder}
            clearable={clearable}
            clearIcon={clearIcon}
            clearTrigger={clearTrigger}
            align={inputAlign}
            color={inputColor}
            autoFocus={autoFocus}
            focus={focus}
            disabled={disabled}
            readonly={readonly}
            confirmType="search"
            onConfirm={handleSearch}
            onClear={onClear}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </Field>
      </View>
      {action && (
        <View
          className={prefixClassname("search__action")}
          children={_.isBoolean(action) ? "取消" : action}
          onClick={_.isBoolean(action) ? onCancel : undefined}
        />
      )}
    </View>
  )
}

export default Search
