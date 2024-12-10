type Props = {
    theme: "primary" | "dark" | "light";
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
        primary: "bg-primary text-[#000]",
        dark: "bg-[#000] text-white",
        light: "bg-white text-[#000]",
    };
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `px-6 py-2 transition-colors rounded-xl hover:opacity-80 text-md font-bold ${buttonTheme[theme]
                } ${disabled && "pointer-events-none cursor-not-allowed bg-gray-400 text-gray-700"}` +
                " " +
                className
            }
        >
            {children}
        </button>
    );
};
export default Button;
