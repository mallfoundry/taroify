# Uploader 文件上传

### 介绍

用于将本地的图片或文件上传至服务器，并在上传过程中展示预览图和上传进度。目前 Uploader 组件不包含将文件上传至服务器的接口逻辑，该步骤需要自行实现。

### 引入

```tsx
import { Uploader } from "taroify/core"
```

## 代码演示

### 基础用法

文件上传触发 `onUpload` 事件，获取到对应的 `file` 对象。

```tsx
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
```

### 文件预览

通过 `value` 属性可以绑定已经上传的文件列表，并展示文件列表的预览图。

```tsx
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
```

### 上传状态

通过 `status` 属性可以标识上传状态，`uploading` 表示上传中，`failed` 表示上传失败，`completed` 表示上传完成。

```tsx
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
```

### 限制上传数量

通过 `maxFiles` 属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏上传区域。

```tsx
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
```

### 自定义上传样式

通过默认插槽可以自定义上传区域的样式。

```tsx
function CustomUploader() {
  return (
    <Uploader>
      <Button icon={<Plus />} color="primary">
        上传文件
      </Button>
    </Uploader>
  )
}
```

### 自定义预览样式

通过自定义 `Uploader.Image` 组件可以自定义覆盖在预览区域上方的内容。

```tsx
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
```

```scss
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px * 2;
  color: #fff;
  font-size: 12px * 2;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
```

### 禁用文件上传

通过 `disabled` 属性禁用文件上传。

```tsx
<Uploader disabled />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 已上传的文件列表 | _FileListItem[]_ | - |
| name | 标识符，可以在回调函数的第二项参数中获取 | _number \| string_ | - |
| multiple | 是否开启图片多选，部分安卓机型不支持 | _boolean_ | `false` |
| disabled | 是否禁用文件上传 | _boolean_ | `false` |
| readonly | 是否将上传区域设置为只读状态 | _boolean_ | `false` |
| removable | 是否展示删除按钮 | _boolean_ | `true` |
| maxFiles | 文件上传数量限制 | _number \| string_ | - |

### Events

| 事件名                | 说明                   | 回调参数            |
| --------------------- | ---------------------- | ------------------- |
| onUpload              | 点击上传区域时触发     | _event: MouseEvent_ |
| onRemove              | 删除文件预览时触发     | -     |
| onChange              | 已上传图片列表改变后触发 | _file: UploadFile \| UploadFile[]_  |
