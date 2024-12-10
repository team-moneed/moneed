type CardProps = {
    img: string;
    title: string;
    date: string;
};

const Card = ({ img, title, date }: CardProps) => {
    return (
        <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white border">
            <img src={img} alt={img} className="w-full h-48 object-cover" />

            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm mb-4">{date}</p>
            </div>
        </div>
    );
};

export default Card;
