import type { FunctionComponent } from "react"
import AvatarComponent, { type AvatarProps } from "./avatar"
import AvatarGroup from "./avatar-group"

export type { AvatarThemeVars } from "./avatar.shared"
interface AvatarInterface extends FunctionComponent<AvatarProps> {
  Group: typeof AvatarGroup
}

const Avatar = AvatarComponent as AvatarInterface
Avatar.Group = AvatarGroup

export default Avatar
