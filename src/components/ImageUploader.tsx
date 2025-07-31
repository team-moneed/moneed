'use client';

import { compressImage, COMPRESSION_OPTIONS } from '@/util/optimizeImage';
import { cn } from '@/util/style';
import { forwardRef } from 'react';

interface ImageUploaderProps {
    setImage: (image: File | null) => void;
    preview: React.ReactNode;
    setPreviewUrl: (url: string | null) => void;
}

const ImageUploader = forwardRef<HTMLInputElement, ImageUploaderProps>(({ setImage, preview, setPreviewUrl }, ref) => {
    const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const optimizedImage = await compressImage(file, COMPRESSION_OPTIONS.THUMBNAIL);
            setImage(optimizedImage);
            setPreviewUrl(URL.createObjectURL(optimizedImage));
        }
    };

    return (
        <>
            <div className='relative flex flex-row gap-2 items-start'>
                <input
                    id='image-uploader'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleUploadFile}
                    multiple={false}
                    ref={ref}
                />
                <label className={cn('cursor-pointer ml-auto mr-0')} htmlFor='image-uploader'>
                    <img
                        src='/icon/icon-gallery.svg'
                        alt='gallery'
                        className='w-full h-full object-cover p-[.6rem]'
                        width={36}
                        height={36}
                    />
                </label>
                {preview}
            </div>
        </>
    );
});

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;
