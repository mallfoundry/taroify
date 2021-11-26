import useRenderedEffect from "./use-rendered-effect"

export default function useMounted(cb: (...args: any[]) => any) {
  useRenderedEffect(cb, [])
}
