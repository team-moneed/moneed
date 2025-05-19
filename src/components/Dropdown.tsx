'use client';

import { ReactNode, useEffect, useRef } from 'react';

type DropdownProps = {
    children?: ReactNode;
    onClose: () => void;
};

const Dropdown = ({ children, onClose }: DropdownProps) => {
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

    return <div ref={dropdownRef}>{children}</div>;
};

export default Dropdown;
