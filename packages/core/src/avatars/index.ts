import AvatarsElement, { AvatarsProps } from "./avatars"
import AvatarsGroup from "./avatars-group"

interface AvatarsInterface {
  (props: AvatarsProps): JSX.Element

  Group: typeof AvatarsGroup
}

const Avatars = AvatarsElement as AvatarsInterface
Avatars.Group = AvatarsGroup

export default Avatars
