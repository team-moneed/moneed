interface IconProps {
    className?: string;
    iconName?: string;
    width?: number | string;
    height?: number | string;
    onClick?: () => void
}

const Icon = ({ className, iconName, width, height, onClick }: IconProps) => {
    return (
        <div className={className}>
            <img src={iconName}
                width={width}
                height={height}
                onClick={onClick}
                alt="icon" />
        </div>
    );
};

export default Icon;
