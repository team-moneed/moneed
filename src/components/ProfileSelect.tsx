interface ProfileSelectProps {
    onSelect: (image: string) => void;
}

const ProfileSelect = ({ onSelect }: ProfileSelectProps) => {

    const images = [
        "/src/assets/profile/profile-1.svg",
        "/src/assets/profile/profile-2.svg",
        "/src/assets/profile/profile-3.svg",
        "/src/assets/profile/profile-4.svg",
        "/src/assets/profile/profile-5.svg",
        "/src/assets/profile/profile-6.svg",
    ];

    return (
        <div className="grid grid-cols-4 gap-[1rem] mt-[2rem]">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Profile ${index + 1}`}
                    className="aspect-[1/1] w-[4.8rem] object-cover cursor-pointer"
                    onClick={() => onSelect(image)}
                />
            ))}
        </div>
    );
};

export default ProfileSelect;
