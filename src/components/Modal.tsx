import { ReactNode, useEffect } from "react";
import Button from "./Button";
import ReactDOM from 'react-dom';

type ModalProps = {
    children: ReactNode;
    leftButtontext?: string;
    rightbuttontext: string;
    leftButtonevent?: () => void;
    rightbuttonevent: () => void;
    leftvisible?: boolean;
    rightvisible?: boolean;
}

const Modal = ({ leftButtontext, rightbuttontext, leftButtonevent, rightbuttonevent, leftvisible = true, rightvisible = true, children }: ModalProps) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
                    <div className="text-center mb-8">
                        {children}
                    </div>
                    <div className="flex justify-center space-x-4">
                        {leftvisible && (
                            <Button theme="primary" onClick={leftButtonevent}>
                                {leftButtontext}
                            </Button>
                        )}
                        {rightvisible && <Button theme="primary" onClick={rightbuttonevent}>
                            {rightbuttontext}
                        </Button>}
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default Modal;