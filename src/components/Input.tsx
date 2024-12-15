const Input = ({ type, onChange, className, placeholder, value }) => {
    return (
        <div>
            <input
                type={type}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
                value={value}
            >
            </input>
        </div>
    );
};

export default Input;