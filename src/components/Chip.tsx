type ChipType = {
    className?: string;
    active?: boolean;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: string;
};

const Chip = ({ className, active, label, onClick, disabled, icon }: ChipType) => {
    return (
        <button
            type="button"
            className={`rounded-[48px] border-[1px] ${active ? "bg-blue-500 text-white" : "bg-white text-black"
                } ${className}`}
            onClick={onClick}
            disabled={disabled}>
            {icon ? (
                <img src={icon} alt="icon" className="w-[20px] h-[20px]" />
            ) : (
                icon
            )}
            {label}
        </button>
    );
};

export default Chip;
