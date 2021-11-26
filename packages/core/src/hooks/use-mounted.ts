import useRenderedEffect from "./use-rendered-effect"

export default function useMounted(cb: (...args: any[]) => any) {
  useRenderedEffect(
    cb,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}
