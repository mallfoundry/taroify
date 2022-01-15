import * as _ from "lodash"
import { ReactNode } from "react"

export type UploadStatus = "uploading" | "completed" | "failed"

export interface UploadFile {
  url?: string
  type?: string
  name?: string
  removable?: boolean
  status?: UploadStatus
  message?: ReactNode
}

export function getOneUploadFile(files: UploadFile | UploadFile[]) {
  return _.isArray(files) ? files[0] : (files as UploadFile)
}

export function getUploadFiles(files: UploadFile | UploadFile[]) {
  return _.isArray(files) ? files : [files as UploadFile]
}
