import { ReactNode } from "react"

/* eslint-disable  no-shadow */
export enum TargetType {
  /* eslint-enable  no-shadow */
  H5 = "h5",
}

type TargetTypeString = "h5"

interface TargetProps {
  type?: TargetType | TargetTypeString
  children?: ReactNode
}

export default function Target(props: TargetProps) {
  const { type, children } = props
  return <>{type === process.env.TARO_ENV && children}</>
}
