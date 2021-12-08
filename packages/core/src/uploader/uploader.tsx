import { Close } from "@taroify/icons"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useMemo } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import { useValue } from "../utils/state"
import UploaderImage from "./uploader-image"
import UploaderMask from "./uploader-mask"
import UploaderUpload from "./uploader-upload"
import UploaderContext from "./uploader.context"
import { getOneUploadFile, getUploadFiles, UploadFile, UploadStatus } from "./uploader.shared"

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

interface UseUploadFilesRenderProps {
  defaultValue?: UploadFile[] | UploadFile
  value?: UploadFile[] | UploadFile
  disabled?: boolean
  multiple?: boolean
  maxFiles?: number

  onChange?(file?: any): void
}

function UploadFilesRender(props: UseUploadFilesRenderProps): JSX.Element {
  const {
    defaultValue,
    value: valueProp,
    disabled,
    multiple,
    maxFiles = Number.MAX_VALUE,
    onChange: onChangeProp,
  } = props

  const { value = [], setValue } = useValue({
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
  })

  const files = useMemo(() => {
    if (!multiple) {
      return []
    }
    const __files__ = _.map(getUploadFiles(value) as UploadFile[], (file, index) => (
      <UploaderImage
        key={index}
        type={file?.type}
        url={file?.url}
        name={file?.name}
        removable={(file?.removable ?? true) && file?.status !== UploadStatus.Uploading}
        children={renderUploaderMask(file)}
        onRemove={() => !disabled && setValue(_.filter(value, (item) => item !== file))}
      />
    ))

    if (__files__.length < maxFiles) {
      __files__.push(<UploaderUpload key="upload" />)
    }
    return __files__ as ReactNode
  }, [disabled, maxFiles, multiple, setValue, value])

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
        onRemove={() =>
          !disabled &&
          // @ts-ignore
          setValue(null)
        }
      />
    )
  }

  return files as JSX.Element
}

interface BaseUploaderProps extends ViewProps {
  className?: string
  defaultValue?: UploadFile[] | UploadFile
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

export default function Uploader(props: UploaderProps) {
  const {
    className,
    defaultValue,
    value,
    disabled = false,
    maxFiles,
    multiple,
    children,
    onUpload,
    onChange,
    ...restProps
  } = props

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
          {children ?? (
            <UploadFilesRender
              defaultValue={defaultValue}
              value={value}
              disabled={disabled}
              maxFiles={maxFiles}
              multiple={multiple}
              onChange={onChange}
            />
          )}
        </View>
      </View>
    </UploaderContext.Provider>
  )
}
