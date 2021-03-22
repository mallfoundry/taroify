import { ReactNode } from "react";
interface CellProps {
    className?: string;
    label?: ReactNode;
    arrow?: boolean;
    endIcon?: ReactNode;
    clickable?: boolean;
    children?: ReactNode;
}
export default function Cell(props: CellProps): JSX.Element;
export {};
