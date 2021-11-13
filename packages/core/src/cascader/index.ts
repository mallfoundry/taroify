import CascaderComponent, { CascaderProps } from "./cascader"
import CascaderHeader from "./cascader-header"
import CascaderOption from "./cascader-option"
import CascaderTab from "./cascader-tab"
import { CascaderOptionObject } from "./cascader.shared"

interface CascaderInterface {
  (props: CascaderProps): JSX.Element

  Header: typeof CascaderHeader
  Tab: typeof CascaderTab
  Option: typeof CascaderOption
}

const Cascader = CascaderComponent as CascaderInterface

Cascader.Header = CascaderHeader
Cascader.Tab = CascaderTab
Cascader.Option = CascaderOption

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace Cascader {
  export type OptionObject = CascaderOptionObject
}

export default Cascader
