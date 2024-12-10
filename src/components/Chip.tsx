type ChipType = {
    className?: string;
    active?: boolean;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
};

const Chip = ({ className, active, label, onClick, disabled }: ChipType) => {
    return (
        <button
            type="button"
            className={`rounded-[48px] py-[12px] px-[24px] border-[1px] ${active ? "bg-blue-500 text-white" : "bg-white text-black"
                } ${className}`}
            onClick={onClick}
            disabled={disabled}>
            {label}
        </button>
    );
};

export default Chip;
