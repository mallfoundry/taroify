import * as React from "react"
import {ForwardRefExoticComponent} from "react"
import RollingTextComponent, {RollingTextProps} from "./rolling-text"

export type {RollingTextRef} from './rolling-text';

interface RollingTextInterface extends ForwardRefExoticComponent<RollingTextProps> {
  (props: RollingTextProps): React.ReactElement
}

const RollingText = RollingTextComponent as RollingTextInterface

export default RollingText;
