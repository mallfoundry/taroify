import { CSSProperties, ReactNode } from "react";
interface ColProps {
    className?: string;
    style?: CSSProperties;
    span?: string;
    offset?: string;
    children?: ReactNode;
}
export default function Col(props: ColProps): JSX.Element;
export {};
