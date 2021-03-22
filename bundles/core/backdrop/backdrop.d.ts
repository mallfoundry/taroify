import { ITouchEvent } from "@tarojs/components";
import { ReactNode } from "react";
interface BackdropProps {
    open?: boolean;
    closable?: boolean;
    children?: ReactNode;
    onClose?: (event: ITouchEvent) => void;
}
export default function Backdrop(props: BackdropProps): JSX.Element;
export {};
