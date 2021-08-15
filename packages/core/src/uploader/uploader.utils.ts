import { UploadFile } from "./uploader.shared"

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
