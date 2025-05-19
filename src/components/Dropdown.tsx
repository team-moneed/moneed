'use client';

import { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';

type DropdownProps = {
    children?: ReactNode;
    firsttext?: string;
    secondtext?: string;

    firstevent?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
    secondevent?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
    onClose: () => void;
};

const Dropdown = ({ children, firsttext, secondtext, firstevent, secondevent, onClose }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div ref={dropdownRef} className='absolute top-0 right-10 z-50 bg-white shadow-custom rounded-[.8rem]'>
            <div className='px-[4.4rem] py-[3.6rem]'>
                <div className='cursor-pointer flex items-center mb-[2.4rem] whitespace-nowrap' onClick={firstevent}>
                    <div className='overflow-hidden aspect-[1/1] w-[1.8rem] mr-[.6rem] '>
                        <img src='/icon/icon-scissors.svg' alt='Scissors Icon' className='w-full h-full object-cover' />
                    </div>
                    <div>{firsttext}</div>
                </div>
                <div className='cursor-pointer flex items-center' onClick={secondevent}>
                    <div className='overflow-hidden aspect-[1/1] w-[1.8rem] mr-[.6rem]'>
                        <img src='/icon/icon-trashcan.svg' alt='Trashcan Icon' className='w-full h-full object-cover' />
                    </div>
                    <div>{secondtext}</div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Dropdown;
