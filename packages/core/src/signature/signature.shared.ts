export interface SignatureProps {
  /** 导出图片类型 */
  type?: string
  /** 笔触颜色 */
  penColor?: string
  /** 线条宽度 */
  lineWidth?: number
  /** 背景颜色 */
  backgroundColor?: string
  className?: string
  canvasId?: string

  onStart?(): void
  onSigning?(): void
  onEnd?(): void
}

export interface SignatureInstance {
  getImage(): {
    image: string
    canvas: HTMLCanvasElement | null
  }
  clear(): void
}

export type SignatureThemeVars = {
  signaturePadding?: string
  signatureContentHeight?: string
  signatureContentBackground?: string
  signatureContentBorder?: string
  signatureBorderRadius?: string
}
