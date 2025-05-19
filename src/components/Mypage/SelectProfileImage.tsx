interface SelectProfileImageProps {
    onSelect: (img: string) => void;
}

const SelectProfileImage = ({ onSelect }: SelectProfileImageProps) => {
    const profileImages = Array.from({ length: 15 }, (_, i) => `/profile/profile-${i + 1}.svg`);

    return (
        <div className='grid grid-cols-4 gap-[1rem] p-[2rem] mt-[4rem]'>
            {profileImages.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Profile ${index + 1}`}
                    className='w-[6rem] h-[6rem] object-cover rounded-full cursor-pointer border border-solid border-[var(--moneed-gray-4)] hover:border-[var(--moneed-primary)]'
                    onClick={() => onSelect(img)}
                />
            ))}
        </div>
    );
};

export default SelectProfileImage;
