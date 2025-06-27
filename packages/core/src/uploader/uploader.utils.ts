import type { ReactNode } from "react"
import type { UploadFile } from "./uploader.shared"

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i

export function isImageFile(item: UploadFile): boolean {
  if (item.type) {
    return item.type.indexOf("image") === 0
  }

  if (item.url) {
    return IMAGE_REGEXP.test(item.url)
  }
  return false
}

export const isExitChildren = (children: ReactNode | ReactNode[]): boolean => {
  return Array.isArray(children) ? children.length > 0 : !!children
}
