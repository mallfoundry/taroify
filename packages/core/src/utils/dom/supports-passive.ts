import { canUseDom } from "./can-use-dom"

export let supportsPassive = false

if (canUseDom) {
  try {
    const opts = Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true
      },
    })
    window.addEventListener("testPassive", null as never, opts)
  } catch (e) {}
}
