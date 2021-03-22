import { ReactNode } from "react";
export declare enum PopupAnchor {
    Top = "top",
    Right = "right",
    Bottom = "bottom",
    Left = "left"
}
declare type PopupAnchorString = "top" | "right" | "bottom" | "left";
interface PopupProps {
    open?: boolean;
    anchor?: PopupAnchor | PopupAnchorString;
    closeable?: boolean;
    children?: ReactNode;
    onClose?: () => void;
}
export default function Popup(props: PopupProps): JSX.Element;
export {};
