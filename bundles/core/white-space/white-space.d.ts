export declare enum WhiteSpaceSize {
    Mini = "mini",
    Small = "small",
    Medium = "medium",
    Large = "large"
}
declare type WhiteSpaceSizeString = "mini" | "small" | "medium" | "large";
interface WhiteSpaceProps {
    size?: WhiteSpaceSize | WhiteSpaceSizeString;
}
export default function WhiteSpace(props: WhiteSpaceProps): JSX.Element;
export {};
