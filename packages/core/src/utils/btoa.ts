/**
 *  https://github.com/dankogai/js-base64/blob/main/base64.ts
 */
const b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
const b64chs = Array.prototype.slice.call(b64ch)
const btoa = (bin: string) => {
  let u32: number
  let c0: number
  let c1: number
  let c2: number
  let asc = ""
  const pad = bin.length % 3
  for (let i = 0; i < bin.length; ) {
    if (
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      (c0 = bin.charCodeAt(i++)) > 255 ||
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      (c1 = bin.charCodeAt(i++)) > 255 ||
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      (c2 = bin.charCodeAt(i++)) > 255
    )
      throw new TypeError("invalid character found")
    u32 = (c0 << 16) | (c1 << 8) | c2
    asc +=
      b64chs[(u32 >> 18) & 63] +
      b64chs[(u32 >> 12) & 63] +
      b64chs[(u32 >> 6) & 63] +
      b64chs[u32 & 63]
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc
}

export default btoa
