import { Close } from "@taroify/icons"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import UploaderImage from "./uploader-image"
import UploaderMask from "./uploader-mask"
import UploaderUpload from "./uploader-upload"
import UploaderContext from "./uploader.context"
import { getOneUploadFile, getUploadFiles, UploadFile, UploadStatus } from "./uploader.shared"

interface BaseUploaderProps extends ViewProps {
  className?: string
  value?: UploadFile[] | UploadFile
  disabled?: boolean
  multiple?: boolean
  maxFiles?: number
  children?: ReactNode

  onUpload?(): void
}

export interface Uploader1Props extends BaseUploaderProps {
  onChange?(file?: UploadFile): void
}

export interface Uploader2Props extends BaseUploaderProps {
  onChange?(files: UploadFile[]): void
}

export interface Uploader3Props extends BaseUploaderProps {
  onChange?(files?: UploadFile[]): void
}

export type UploaderProps = Uploader1Props | Uploader2Props | Uploader3Props

function renderUploaderMask(file: UploadFile) {
  return (
    (file?.status === UploadStatus.Uploading || file?.status === UploadStatus.Failed) && (
      <UploaderMask
        icon={
          file?.status === UploadStatus.Uploading ? (
            <Loading />
          ) : file?.status === UploadStatus.Failed ? (
            <Close />
          ) : undefined
        }
        message={file.message}
      />
    )
  )
}

function renderUploadFiles(props: UploaderProps) {
  const { value = [], disabled, multiple, maxFiles = Number.MAX_VALUE, onChange } = props

  if (_.isEmpty(value)) {
    return <UploaderUpload />
  }

  if (!multiple) {
    const file = getOneUploadFile(value)
    return (
      <UploaderImage
        type={file.type}
        url={file?.url}
        name={file?.name}
        removable={file?.status !== UploadStatus.Uploading}
        children={renderUploaderMask(file)}
        // @ts-ignore
        onRemove={() => !disabled && onChange?.(undefined)}
      />
    )
  }

  const files = _.map(getUploadFiles(value) as UploadFile[], (file, index) => (
    <UploaderImage
      key={index}
      url={file?.url}
      name={file?.name}
      removable={(file?.removable ?? true) && file?.status !== UploadStatus.Uploading}
      children={renderUploaderMask(file)}
      onRemove={() => !disabled && onChange?.(_.filter(value, (item) => item !== file))}
    />
  ))

  if (files.length < maxFiles) {
    files.push(<UploaderUpload key="upload" />)
  }

  return files
}

export default function Uploader(props: UploaderProps) {
  const { className, disabled = false, children, onUpload, ...restProps } = props

  return (
    <UploaderContext.Provider
      value={{
        disabled,
        onUpload,
      }}
    >
      <View className={classNames(prefixClassname("uploader"), className)} {...restProps}>
        <View
          className={classNames(prefixClassname("uploader__wrapper"), {
            [prefixClassname("uploader__wrapper--disabled")]: disabled,
          })}
        >
          {children ?? renderUploadFiles({ ...props, disabled })}
        </View>
      </View>
    </UploaderContext.Provider>
  )
}
