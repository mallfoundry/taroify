const COMPONENT_PREFIX = "\u0074\u0061\u0072\u006f\u0069\u0066\u0079-"

export function prefixClassname(component: string) {
  return `${COMPONENT_PREFIX}${component}`
}
