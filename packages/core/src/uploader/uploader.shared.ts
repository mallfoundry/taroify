import { isArray } from "@taroify/lodash"
import { ReactNode } from "react"

export enum UploadStatus {
  Uploading = "uploading",
  Completed = "completed ",
  Failed = "failed",
}

export type UploadStatusString = "uploading" | "completed" | "failed"

export interface UploadFile {
  url?: string
  type?: string
  name?: string
  removable?: boolean
  status?: UploadStatus | UploadStatusString
  message?: ReactNode
}

export function getOneUploadFile(files: UploadFile | UploadFile[]) {
  return isArray(files) ? files[0] : (files as UploadFile)
}

export function getUploadFiles(files: UploadFile | UploadFile[]) {
  return isArray(files) ? files : [files as UploadFile]
}
