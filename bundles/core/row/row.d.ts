import * as React from "react";
import { ReactNode } from "react";
interface RowContextType {
    gutter: [number | undefined, number | undefined];
}
export declare const RowContext: React.Context<RowContextType>;
export declare enum RowJustify {
    End = "end",
    Center = "center",
    SpaceAround = "space-around",
    SpaceBetween = "space-between"
}
declare type RowJustifyString = "end" | "center" | "space-around" | "space-between";
export declare enum RowAlign {
    Center = "center",
    Bottom = "bottom"
}
declare type RowAlignString = "center" | "bottom";
declare type RowGutter = string | [string, string] | number | [number, number];
interface RowProps {
    className?: string;
    gutter?: RowGutter;
    justify?: RowJustify | RowJustifyString;
    align?: RowAlign | RowAlignString;
    children?: ReactNode;
}
export default function Row(props: RowProps): JSX.Element;
export {};
