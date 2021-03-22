declare enum ToastType {
    loading = 0,
    success = 1,
    fail = 2,
    html = 3
}
interface ToastProps {
    type?: ToastType;
    backdrop?: boolean;
    duration?: number;
}
export default function Toast(props: ToastProps): void;
export {};
