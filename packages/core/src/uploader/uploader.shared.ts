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

export type UploadThemeVars = {
  uploaderSize?: string
  uploaderDisabledOpacity?: string
  uploaderUploadSize?: string
  uploaderUploadWidth?: string
  uploaderUploadHeight?: string
  uploaderUploadMargin?: string
  uploaderUploadBackgroundColor?: string
  uploaderUploadActiveBackgroundColor?: string
  uploaderUploadIconColor?: string
  uploaderUploadIconFontSize?: string
  uploaderUploadTextMarginTop?: string
  uploaderUploadTextColor?: string
  uploaderUploadTextFontSize?: string
  uploaderPreviewMargin?: string
  uploaderPreviewImageSize?: string
  uploaderPreviewImageWidth?: string
  uploaderPreviewImageHeight?: string
  uploaderRemoveSize?: string
  uploaderRemoveWidth?: string
  uploaderRemoveHeight?: string
  uploaderRemoveBackgroundColor?: string
  uploaderRemoveBorderRadius?: string
  uploaderRemoveIconFontSize?: string
  uploaderRemoveIconColor?: string
  uploaderFileSize?: string
  uploaderFileWidth?: string
  uploaderFileHeight?: string
  uploaderFileBackgroundColor?: string
  uploaderFileIconFontSize?: string
  uploaderFileIconColor?: string
  uploaderFileNamePadding?: string
  uploaderFileNameMarginTop?: string
  uploaderFileNameFontSize?: string
  uploaderFileNameColor?: string
  uploaderMaskColor?: string
  uploaderMaskBackgroundColor?: string
  uploaderMaskIconSize?: string
  uploaderMaskMessageMarginTop?: string
  uploaderMaskMessagePadding?: string
  uploaderMaskMessageFontSize?: string
  uploaderMaskMessageLineHeight?: string
  uploaderLoadingIconSize?: string
  uploaderLoadingIconWidth?: string
  uploaderLoadingIconHeight?: string
  uploaderLoadingIconColor?: string
}

export function getOneUploadFile(files: UploadFile | UploadFile[]) {
  return _.isArray(files) ? files[0] : (files as UploadFile)
}

export function getUploadFiles(files: UploadFile | UploadFile[]) {
  return _.isArray(files) ? files : [files as UploadFile]
}
