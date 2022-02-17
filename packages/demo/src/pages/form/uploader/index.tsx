import { Button, Uploader } from "@taroify/core"
import { Plus } from "@taroify/icons"
import { View } from "@tarojs/components"
import { chooseImage } from "@tarojs/taro"
import { useState } from "react"
import Block from "../../../components/block"
import Page from "../../../components/page"
import "./index.scss"

function BasicUploader() {
  const [file, setFile] = useState<Uploader.File>()

  function onUpload() {
    chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setFile({
        url: tempFiles[0].path,
        type: tempFiles[0].type,
        name: tempFiles[0].originalFileObj?.name,
      })
    })
  }

  return <Uploader value={file} onUpload={onUpload} onChange={setFile} />
}

function PreviewUploader() {
  const [files, setFiles] = useState<Uploader.File[]>([
    {
      url: "https://img01.yzcdn.cn/vant/leaf.jpg",
    },
    {
      url: "https://img.yzcdn.cn/vant/tree.jpg",
    },
  ])

  function onUpload() {
    chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setFiles([
        ...files,
        ...tempFiles.map(({ path, type, originalFileObj }) => ({
          type,
          url: path,
          name: originalFileObj?.name,
        })),
      ])
    })
  }

  return <Uploader value={files} multiple onUpload={onUpload} onChange={setFiles} />
}

function UploaderWithStatus() {
  const [files, setFiles] = useState<Uploader.File[]>([
    {
      url: "https://img01.yzcdn.cn/vant/leaf.jpg",
      status: "uploading",
      message: "上传中...",
    },
    {
      url: "https://img01.yzcdn.cn/vant/tree.jpg",
      status: "failed",
      message: "上传失败",
    },
  ])

  function onUpload() {
    chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setFiles([
        ...files,
        ...tempFiles.map(({ path, type, originalFileObj }) => ({
          type,
          url: path,
          name: originalFileObj?.name,
        })),
      ])
    })
  }

  return <Uploader value={files} multiple onUpload={onUpload} onChange={setFiles} />
}

function MaxFilesUploader() {
  const [files, setFiles] = useState<Uploader.File[]>([])

  function onUpload() {
    chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setFiles([
        ...files,
        ...tempFiles.map(({ path, type, originalFileObj }) => ({
          type,
          url: path,
          name: originalFileObj?.name,
        })),
      ])
    })
  }

  return <Uploader value={files} multiple maxFiles={2} onUpload={onUpload} onChange={setFiles} />
}

function CustomUploader() {
  return (
    <Uploader>
      <Button icon={<Plus />} color="primary">
        上传文件
      </Button>
    </Uploader>
  )
}

function CustomPreviewUploader() {
  const [files, setFiles] = useState<Uploader.File[]>([
    {
      url: "https://img01.yzcdn.cn/vant/leaf.jpg",
    },
  ])

  function onUpload() {
    chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setFiles([
        ...files,
        ...tempFiles.map(({ path, type, originalFileObj }) => ({
          type,
          url: path,
          name: originalFileObj?.name,
        })),
      ])
    })
  }

  return (
    <Uploader value={files} multiple onUpload={onUpload} onChange={setFiles}>
      {files.map((image) => (
        <Uploader.Image
          key={image.url}
          url={image.url}
          name={image.name}
          type={image.type}
          onRemove={() => setFiles(files.filter((item) => item !== image))}
        >
          <View className="preview-cover taroify-ellipsis">图片名称</View>
        </Uploader.Image>
      ))}
      <Uploader.Upload />
    </Uploader>
  )
}

function DisabledUploader() {
  return <Uploader disabled />
}

export default function UploaderDemo() {
  return (
    <Page title="Uploader 文件上传" className="uploader-demo">
      <Block title="基础用法">
        <BasicUploader />
      </Block>
      <Block title="文件预览">
        <PreviewUploader />
      </Block>
      <Block title="上传状态">
        <UploaderWithStatus />
      </Block>
      <Block title="限制上传数量">
        <MaxFilesUploader />
      </Block>
      <Block title="自定义上传样式">
        <CustomUploader />
      </Block>
      <Block title="自定义预览样式">
        <CustomPreviewUploader />
      </Block>
      <Block title="禁用文件上传">
        <DisabledUploader />
      </Block>
    </Page>
  )
}
