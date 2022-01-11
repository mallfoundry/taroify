import * as React from "react"
import Avatars from "./avatars"

interface AvatarsGroupProps {
  children: React.ReactNode
  max?: number
}
export default function AvatarsGroup({ max, children }: AvatarsGroupProps): JSX.Element {
  return (
    <>
      {children}
      <Avatars>+2</Avatars>
    </>
  )
}
