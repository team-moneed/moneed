import { ReactNode } from "react";

type MypageBoxType = {
    className?: string;
    menu: string;
    onClick?: () => void;
    children?: ReactNode
};

const MypageBox = ({ className, menu, onClick, children }: MypageBoxType) => {
    return (
        <>
            <div
                className={className}
                onClick={onClick}
            >
                {menu}
                <div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default MypageBox;