import { FunctionComponent } from "react"
import AvatarComponent, { AvatarProps } from "./avatar"
import AvatarGroup from "./avatar-group"

interface AvatarInterface extends FunctionComponent<AvatarProps> {
  Group: typeof AvatarGroup
}

const Avatar = AvatarComponent as AvatarInterface
Avatar.Group = AvatarGroup

export default Avatar
