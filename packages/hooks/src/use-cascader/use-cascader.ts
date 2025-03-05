import useCascaderNew, {
  type CascaderObjectNew,
  type UseCascaderNewOptions,
} from "./use-cascader.new"
import useCascaderOld, {
  type CascaderObjectOld,
  type UseCascaderOldOptions,
} from "./use-cascader.old"
import type { CascaderOption } from "./use-cascader.shared"

interface UseCascaderOptions {
  options?: CascaderOption[]
  data?: CascaderOption[]
}

function useCascader(options: UseCascaderOldOptions): CascaderObjectOld
function useCascader(options: UseCascaderNewOptions): CascaderObjectNew
function useCascader({ data, ...restOptions }: UseCascaderOptions) {
  const useCompatibleCascader = data ? useCascaderNew : useCascaderOld
  return useCompatibleCascader({
    data,
    ...restOptions,
  })
}

export default useCascader
