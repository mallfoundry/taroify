import UploaderComponent, { UploaderProps } from "./uploader"
import UploaderImage from "./uploader-image"
import UploaderUpload from "./uploader-upload"
import { UploadFile } from "./uploader.shared"

export type { UploaderProps } from "./uploader"

interface UploaderInterface {
  (props: UploaderProps): JSX.Element

  Upload: typeof UploaderUpload
  Image: typeof UploaderImage
}

const Uploader = UploaderComponent as UploaderInterface

Uploader.Upload = UploaderUpload
Uploader.Image = UploaderImage

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace Uploader {
  export type File = UploadFile
}

export default Uploader
