import { View } from "@tarojs/components"
import * as React from "react"
import  { AvatarVarinatType } from "./avatar.shared"
import Avatars from "./avatar"

interface AvatarGroupProps {
  children: React.ReactNode[]
  max?: number
  variant?: AvatarVarinatType
  spacing?: number
  total?: number
}
export default function AvatarsGroup({
  variant = "circular",
  max = 0,
  children,
  spacing = 6,
  total,
}: AvatarGroupProps): JSX.Element {
  const length = React.useMemo(() => {
    return children.length - max
  }, [children, max])
  const NewReactNode: React.ReactNode[] = []

  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (NewReactNode.length < max || total) {
        NewReactNode.push(
          React.cloneElement(
            child,
            {
              key: index,
              position: "position",
              style: {
                left: child.props.width - spacing || index * (36 - spacing)+"px",
                zIndex: 999 - index
              },
              variant,
            },
            null,
          ),
        )
      }
    }
  })

  return (
    <>
      <View style={{ position: "relative" }}>
        {NewReactNode}
        <Avatars
          variant={variant}
          position={"position"}
          style={{left:NewReactNode.length * (36 - spacing)+"px"}}
        >
          +{total ? total - children.length : length}
        </Avatars>
      </View>
      <Avatars style={{ background: "transparent" }}></Avatars>
    </>
  )
}
