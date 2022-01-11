import { View } from "@tarojs/components"
import * as React from "react"
import Avatars, { variantEnum, VarinatType } from "./avatars"

interface AvatarsGroupProps {
  children: React.ReactNode[]
  max?: number
  variant?: variantEnum | VarinatType
  spacing?: number
  total?: number
}
export default function AvatarsGroup({
  variant = variantEnum.CIRCULAR,
  max = 0,
  children,
  spacing = 6,
  total,
}: AvatarsGroupProps): JSX.Element {
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
              left: child.props.width - spacing || index * (36 - spacing),
              ZIndex: 999 - index,
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
        <Avatars variant={variant} position={"position"} left={NewReactNode.length * (36 - spacing)}>
          +{total ? total - children.length : length}
        </Avatars>
      </View>
      <Avatars sx={{background:"transparent"}}></Avatars>
    </>
  )
}
