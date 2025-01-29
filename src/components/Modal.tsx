import { ReactNode, useEffect } from "react";
import Button from "./Button";
import ReactDOM from 'react-dom';

type ModalProps = {
    children: ReactNode;
    leftButtontext?: string;
    rightButtontext?: string;
    leftButtonevent?: () => void;
    rightButtonevent: () => void;
    leftvisible?: boolean;
    rightvisible?: boolean;
    onClose: () => void;
}

const Modal = ({ leftButtontext, rightButtontext, leftButtonevent, rightButtonevent, leftvisible = true, rightvisible = true, children, onClose }: ModalProps) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        onClose();
    };

    const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return ReactDOM.createPortal(
        <>
            <div
                onClick={handleOutsideClick}
                className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                <div
                    onClick={handleInsideClick}
                    className="bg-white w-full max-w-md p-[2.4rem] rounded-[.8rem] shadow-lg relative">
                    <div className="text-[1.4rem] text-center text-[var(--moneed-black)] font-[600] leading-[140%]">
                        {children}
                    </div>
                    <div className="mt-[2.4rem] flex justify-center gap-[3.9rem]">
                        {leftvisible && (
                            <Button theme="secondary" className="px-[2rem] py-[1.2rem] text-[1.4rem] font-[600] leading-[140%] text-[var(--moneed-gray-7)]" onClick={leftButtonevent}>
                                {leftButtontext}
                            </Button>
                        )}
                        {rightvisible &&
                            <Button theme="secondary" textcolor="secondary" className="px-[2rem] py-[1.2rem] text-[1.4rem] font-[600] leading-[140%] text-[var(--moneed-black)]" onClick={rightButtonevent}>
                                {rightButtontext}
                            </Button>}
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default Modal;