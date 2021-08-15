import UploaderElement, { UploaderProps } from "./uploader"
import UploaderImage from "./uploader-image"
import UploaderUpload from "./uploader-upload"
import { UploadFile } from "./uploader.shared"

interface UploaderInterface {
  (props: UploaderProps): JSX.Element

  Upload: typeof UploaderUpload
  Image: typeof UploaderImage
}

const Uploader = UploaderElement as UploaderInterface

Uploader.Upload = UploaderUpload
Uploader.Image = UploaderImage

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace Uploader {
  export type File = UploadFile
}

export default Uploader
