'use client';

import { CreatePostField, UpdatePostField } from '@/types/fieldData';
import { compressImage, COMPRESSION_OPTIONS } from '@/util/optimizeImage';
import { cn } from '@/util/style';
import { forwardRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface ImageUploaderProps {
    id: string;
    imgClassName?: string;
    buttonpositionClassName?: string;
    name: keyof CreatePostField | keyof UpdatePostField;
    setValue: UseFormSetValue<CreatePostField | UpdatePostField>;
    previewImageUrl?: string;
}

const ImageUploader = forwardRef<HTMLInputElement, ImageUploaderProps>(
    ({ id, imgClassName, buttonpositionClassName, name, setValue, previewImageUrl }, ref) => {
        const [previewImage, setPreviewImage] = useState<string | null>(previewImageUrl ?? null);

        const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const optimizedImage = await compressImage(file, COMPRESSION_OPTIONS.THUMBNAIL);
                setValue(name, optimizedImage);
                setPreviewImage(URL.createObjectURL(optimizedImage));
            }
        };

        const handleDeleteFile = () => {
            setValue(name, null);
            setPreviewImage(null);
        };

        return (
            <>
                <div className='relative flex flex-row gap-2 items-start'>
                    <input
                        id={id}
                        name={name}
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={handleUploadFile}
                        multiple={false}
                        ref={ref}
                    />
                    <div className='absolute flex gap-x-[9px] bottom-16 z-10'>
                        {previewImage && (
                            <div className='relative size-[6rem]'>
                                <img src={previewImage} alt='thumbnail-preview' className={imgClassName} />
                                <button
                                    type='button'
                                    onClick={() => handleDeleteFile()}
                                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center'
                                >
                                    x
                                </button>
                            </div>
                        )}
                    </div>
                    <label className={cn('cursor-pointer ml-auto', buttonpositionClassName)} htmlFor={id}>
                        <img
                            src='/icon/icon-gallery.svg'
                            alt='gallery'
                            className='w-full h-full object-cover p-[.6rem]'
                            width={36}
                            height={36}
                        />
                    </label>
                </div>
            </>
        );
    },
);

ImageUploader.displayName = 'ImageUploader';

export default ImageUploader;
