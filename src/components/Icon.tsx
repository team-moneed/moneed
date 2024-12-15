const Icon = ({ className, iconName, width, height, onClick }) => {
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
