import { ReactNode } from "react";

type StockTypeChipType = {
    className?: string;
    active?: boolean;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: string;
    children?: ReactNode;
};

const StockTypeChip = ({ className, active, label, onClick, disabled, icon, children }: StockTypeChipType) => {
    const chipWidth = label.length < 5 ? 'w-[96px]' : 'w-[140px]';

    return (
        <button
            type="button"
            className={`rounded-[1.2rem] px-[1.6rem] py-[1rem] flex items-center text-[1.2rem] text-[600] leading-[135%] ${chipWidth} ${active ? "bg-[var(--moneed-black)] text-white" : "bg-[var(--moneed-white)] border border-solid border-[var(--moneed-gray-5)] text-[var(--moneed-black)]"
                } ${className}`}
            onClick={onClick}
            disabled={disabled}>
            {icon ? (
                <img src={icon} alt="icon" className="w-[16px] h-[16px] mr-[.5rem]" />
            ) : (
                icon
            )}
            {label}
        </button>
    );
};

export default StockTypeChip;
