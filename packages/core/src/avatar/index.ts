import AvatarElement, { AvatarProps } from "./avatar"
import AvatarGroup from "./avatar-group"

interface AvatarsInterface {
  (props: AvatarProps): JSX.Element

  Group: typeof AvatarGroup
}

const Avatar = AvatarElement as AvatarsInterface
Avatar.Group = AvatarGroup

export default Avatar
