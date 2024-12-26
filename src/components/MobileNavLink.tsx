import { ReactNode } from "react";
import { Link } from 'react-router-dom';

type MobileNavType = {
    className?: string;
    active?: boolean;
    icon?: string;
    activeIcon?: string;
    to: string;
    children?: ReactNode
};

const MobileNavLink = ({ className, active, icon, activeIcon, to, children }: MobileNavType) => {
    return (
        <Link to={to}
            className={`flex flex-col justify-center items-center gap-[.3rem] text-[1rem] flex-1 ${active ? "text-[var(--moneed-black)]" : "text-[var(--moneed-gray-6)]"
                } ${className}`}
        >
            {icon ? (
                <img
                    src={active ? activeIcon || icon : icon}
                    alt="icon"
                    className="w-[2.4rem] h-[2.4rem]" />
            ) : (
                icon
            )}
            {children}
        </Link>
    );
};
export default MobileNavLink;