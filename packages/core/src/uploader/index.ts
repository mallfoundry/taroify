import UploaderComponent, { type UploaderProps } from "./uploader"
import UploaderImage from "./uploader-image"
import UploaderUpload from "./uploader-upload"
import type { UploadFile } from "./uploader.shared"

export type { UploaderProps } from "./uploader"

export type { UploadThemeVars } from "./uploader.shared"

interface UploaderInterface {
  (props: UploaderProps): JSX.Element

  Upload: typeof UploaderUpload
  Image: typeof UploaderImage
}

const Uploader = UploaderComponent as UploaderInterface

Uploader.Upload = UploaderUpload
Uploader.Image = UploaderImage

namespace Uploader {
  export type File = UploadFile
}

export default Uploader
