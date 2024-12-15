import { ReactNode } from "react";

type CardProps = {
    cardImgages: string[] | string;
    title?: string;
    content?: string;
    date?: string;
    onClick: () => void;
    children?: ReactNode;
    className?: string;
};

const Card = ({ cardImgages, title, content, date, children, className = "", onClick }: CardProps) => {

    const images = Array.isArray(cardImgages) ? cardImgages : [cardImgages];

    return (
        <div
            onClick={onClick}
            className={`rounded-lg overflow-hidden shadow-md border p-4 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg ${className}`}
        >
            {images.map((cardImgage, index) => (
                <img
                    key={index}
                    src={cardImgage}
                    alt={`Card image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                />
            ))}

            <div>
                {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
                {content && <p className="text-gray-600 text-sm mb-2">{content}</p>}
                {date && <p className="text-gray-400 text-xs">{date}</p>}
            </div>

            {children}
        </div>
    );
};

export default Card;
