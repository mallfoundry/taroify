import CascaderElement, { CascaderProps } from "./cascader"
import CascaderOption from "./cascader-option"
import CascaderTab from "./cascader-tab"

interface CascaderInterface {
  (props: CascaderProps): JSX.Element

  Tab: typeof CascaderTab
  Option: typeof CascaderOption
}

const Cascader = CascaderElement as CascaderInterface

Cascader.Tab = CascaderTab
Cascader.Option = CascaderOption

export default Cascader
