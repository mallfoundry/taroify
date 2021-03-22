import { CSSProperties } from "react";
export declare enum IconTheme {
    Filled = "filled",
    Outlined = "outlined",
    Rounded = "rounded",
    Sharp = "sharp"
}
declare type IconThemeString = "filled" | "outlined" | "rounded" | "sharp";
export declare enum IconSize {
    Inherit = "inherit",
    Mini = "mini",
    Small = "small",
    Medium = "medium",
    Large = "large"
}
export declare type IconSizeString = "inherit" | "mini" | "small" | "medium" | "large";
export declare enum IconColor {
    Inherit = "inherit",
    Default = "default",
    Primary = "primary",
    Info = "info",
    Success = "success",
    Warning = "warning",
    Danger = "danger"
}
export declare type IconColorString = "inherit" | "default" | "primary" | "info" | "success" | "warning" | "danger";
export interface IconProps {
    className?: string;
    style?: CSSProperties;
    theme?: IconTheme | IconThemeString;
    size?: IconSize | IconSizeString;
    color?: IconColor | IconColorString;
    children?: string;
}
export default function Icon(props: IconProps): JSX.Element;
export {};
