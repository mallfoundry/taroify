import { ReactNode } from "react";
import { ITouchEvent } from "@tarojs/components/types/common";
export declare enum ButtonFormType {
    Button = "button",
    Submit = "submit",
    Reset = "reset"
}
export declare enum ButtonVariant {
    Contained = "contained",
    Text = "text",
    Outlined = "outlined"
}
declare type ButtonVariantString = "contained" | "text" | "outlined";
export declare enum ButtonSize {
    Mini = "mini",
    Small = "small",
    Medium = "medium",
    Large = "large"
}
declare type ButtonSizeString = "mini" | "small" | "medium" | "large";
export declare enum ButtonColor {
    Default = "default",
    Primary = "primary",
    Info = "info",
    Success = "success",
    Warning = "warning",
    Danger = "danger"
}
declare type ButtonColorString = "default" | "primary" | "info" | "success" | "warning" | "danger";
export declare enum ButtonShape {
    Circle = "circle",
    Round = "round"
}
declare type ButtonShapeString = "circle" | "round";
interface ButtonProps {
    variant?: ButtonVariant | ButtonVariantString;
    shape?: ButtonShape | ButtonShapeString;
    size?: ButtonSize | ButtonSizeString;
    color?: ButtonColor | ButtonColorString;
    block?: boolean;
    formType?: ButtonFormType;
    children?: ReactNode;
    onClick?: (event: ITouchEvent) => void;
}
export default function Button(props: ButtonProps): JSX.Element;
export {};
