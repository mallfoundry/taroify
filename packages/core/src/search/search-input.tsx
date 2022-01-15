import * as React from "react"
import Input, { InputProps } from "../input"

interface SearchInputProps extends InputProps {}

function SearchInput(props: SearchInputProps) {
  const { className, ...restProps } = props
  return <Input className={className} {...restProps} />
}

export default SearchInput
