type IconType = {
    className?: string;
    iconName: string;
    width: number;
    height: number;
    onClick: () => void;
}

const Icon = ({ className, iconName, width, height, onClick }: IconType) => {
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
