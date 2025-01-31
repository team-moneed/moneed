type IconType = {
    className?: string;
    iconUrl: string;
    width: number;
    height: number;
    onClick: () => void;
}

const Icon = ({ className, iconUrl, width, height, onClick }: IconType) => {
    return (
        <div className={className}>
            <img src={iconUrl}
                width={width}
                height={height}
                onClick={onClick}
                alt="icon" />
        </div>
    );
};

export default Icon;
