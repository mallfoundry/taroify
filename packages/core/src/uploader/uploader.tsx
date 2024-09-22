import { useUncontrolled } from "@taroify/hooks"
import { Close } from "@taroify/icons"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode, useCallback, useMemo } from "react"
import Loading from "../loading"
import { prefixClassname } from "../styles"
import UploaderImage from "./uploader-image"
import UploaderMask from "./uploader-mask"
import UploaderUpload from "./uploader-upload"
import UploaderContext from "./uploader.context"
import { getOneUploadFile, getUploadFiles, UploadFile } from "./uploader.shared"

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
  children?: ReactNode
  onChange?(file: UploadFile | UploadFile[]): void
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

  const files = useMemo(() => {
    if (!multiple) {
      return []
    }
    const __files__ = _.map(getUploadFiles(value) as UploadFile[], renderImage)
    if (__files__.length < maxFiles) {
      __files__.push(<UploaderUpload key="upload" children={children} />)
    }
    return __files__ as ReactNode
  }, [maxFiles, multiple, renderImage, value, children])

  if (_.isEmpty(value)) {
    return <UploaderUpload children={children} />
  }

  if (!multiple) {
    const file = getOneUploadFile(value)
    return renderImage(file)
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
  removable?: boolean
  children?: ReactNode
  onUpload?(): void
  onChange?(file: (UploadFile & undefined) | (UploadFile[] & undefined)): void
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
            children={children}
          />
        </View>
      </View>
    </UploaderContext.Provider>
  )
}
