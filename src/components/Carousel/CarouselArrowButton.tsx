import { ComponentPropsWithRef } from 'react';

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton = (props: PropType) => {
    const { children, ...restProps } = props;

    return (
        <button
            className='group flex items-center justify-center rounded-full bg-gray-100 p-2 shadow-md hover:bg-gray-200 focus:outline-none disabled:opacity-50'
            type='button'
            {...restProps}
        >
            <svg className='w-6 h-6 text-gray-500 group-hover:text-gray-700' viewBox='0 0 532 532'>
                <path
                    fill='currentColor'
                    d='M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z'
                />
            </svg>
            {children}
        </button>
    );
};

export const NextButton = (props: PropType) => {
    const { children, ...restProps } = props;

    return (
        <button
            className='group flex items-center justify-center rounded-full bg-gray-100 p-2 shadow-md hover:bg-gray-200 focus:outline-none disabled:opacity-50'
            type='button'
            {...restProps}
        >
            <img src='/icon/icon-arrow-right.svg' alt='' className='w-full h-full object-cover' />
            {children}
        </button>
    );
};
