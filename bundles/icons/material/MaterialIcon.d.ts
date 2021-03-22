import { CSSProperties } from "react";
export declare enum MaterialIconTheme {
    Filled = "filled",
    Outlined = "outlined",
    Rounded = "rounded",
    Sharp = "sharp"
}
declare type MaterialIconThemeString = "filled" | "outlined" | "rounded" | "sharp";
interface MaterialIconProps {
    className?: string;
    style?: CSSProperties;
    theme?: MaterialIconTheme | MaterialIconThemeString;
    children?: string;
}
export default function MaterialIcon(props: MaterialIconProps): JSX.Element;
export {};
