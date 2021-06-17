export function noop() {}

export const inBrowser = typeof document !== "undefined" && !!document.scripts
