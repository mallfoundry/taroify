import { useUncontrolled } from "@taroify/hooks"
import { Close } from "@taroify/icons"
import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { type ReactNode, useCallback, useMemo } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import UploaderImage from "./uploader-image"
import UploaderMask from "./uploader-mask"
import UploaderUpload from "./uploader-upload"
import UploaderContext from "./uploader.context"
import { getOneUploadFile, getUploadFiles, type UploadFile } from "./uploader.shared"

function renderUploaderMask(file: UploadFile) {
  return (
    (file?.status === "uploading" || file?.status === "failed") && (
      <UploaderMask
        icon={
          file?.status === "uploading" ? (
            <Loading />
          ) : file?.status === "failed" ? (
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
  children?: ReactNode | ReactNode[]
  onChange?(file: UploadFile | UploadFile[]): void
  itemRender?({ file }: { file: UploadFile }): ReactNode
}

function UploadFilesRender(props: UseUploadFilesRenderProps): JSX.Element {
  const {
    defaultValue,
    value: valueProp,
    disabled,
    multiple,
    maxFiles = Number.MAX_VALUE,
    children,
    onChange: onChangeProp,
    itemRender,
  } = props

  const { value = [], setValue } = useUncontrolled({
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
  })

  const renderImage = useCallback(
    (file: UploadFile, index?: number) => (
      <UploaderImage
        key={index}
        type={file?.type}
        url={file?.url}
        name={file?.name}
        removable={file?.removable && file?.status !== "uploading" ? true : undefined}
        children={renderUploaderMask(file)}
        onRemove={() => {
          if (!disabled) {
            if (multiple) {
              setValue(_.filter(value, (item) => item !== file))
            } else {
              // @ts-ignore
              setValue(null)
            }
          }
        }}
      />
    ),
    [disabled, multiple, setValue, value],
  )

  if (_.isEmpty(value)) {
    return <UploaderUpload children={children} />
  }

  if (!multiple) {
    const file = getOneUploadFile(value)
    return renderImage(file)
  }

  return (
    <>
      {getUploadFiles(value).map((file, index) => {
        return itemRender ? itemRender({ file }) : renderImage(file, index)
      })}

      {getUploadFiles(value).length < maxFiles && (
        <UploaderUpload key="upload" children={children} />
      )}
    </>
  )
}

interface BaseUploaderProps extends ViewProps {
  className?: string
  defaultValue?: UploadFile[] | UploadFile
  value?: UploadFile[] | UploadFile
  disabled?: boolean
  multiple?: boolean
  maxFiles?: number
  removable?: boolean
  children?: ReactNode | ReactNode[]
  onUpload?(): void
  onChange?(file: (UploadFile & undefined) | (UploadFile[] & undefined)): void
  itemRender?({ file }: { file: UploadFile }): ReactNode
}

export type UploaderProps = BaseUploaderProps

export default function Uploader(props: UploaderProps) {
  const {
    className,
    defaultValue,
    value,
    disabled = false,
    removable = true,
    maxFiles,
    multiple,
    children,
    onUpload,
    onChange,
    itemRender,
    ...restProps
  } = props

  return (
    <UploaderContext.Provider
      value={{
        removable,
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
          <UploadFilesRender
            defaultValue={defaultValue}
            value={value}
            disabled={disabled}
            maxFiles={maxFiles}
            multiple={multiple}
            onChange={onChange}
            itemRender={itemRender}
            children={children}
          />
        </View>
      </View>
    </UploaderContext.Provider>
  )
}
