type Props = {
    theme: "primary";
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
};

const Button = ({
    type = "button",
    theme,
    children,
    className,
    onClick,
    disabled = false,
}: Props) => {
    const buttonTheme = {
        primary: "--moneed-brand-color",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `bg-[var(${buttonTheme[theme]})] ${disabled && "pointer-events-none cursor-not-allowed bg-gray-400 text-gray-700"} ` +
                className
            }
        >
            {children}
        </button>
    );
};
export default Button;
