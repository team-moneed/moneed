import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='mt-[12rem] pt-4 px-8 pb-[9.2rem] lg:pb-[3.6rem] lg:mt-[14.8rem]'>
            <p className='text-[1.4rem] font-[400] leading-[140%] mb-[.5rem] text-[var(--moneed-gray-8)] lg:hidden'>
                © Moneed All Rights Reserved
            </p>
            <p className='text-[1.2rem] font-[400] leading-[135%] text-[var(--moneed-gray-8)] lg:text-[var(--moneed-gray-7)] lg:text-center'>
                머니드에서 제공되는 모든 정보는 투자판단의 참고자료로 원금 손실이 발생될 수 있으며, 그 손실은 투자자에게
                귀속됩니다.
            </p>
            <div className='flex items-center gap-x-[1.4rem] flex-wrap mt-[1.2rem] sm:gap-x-[1.8rem]  lg:hidden'>
                <Link to='' className='text-[var(--moneed-gray-8)] text-[1.2rem] font-semibold leading-[135%]'>
                    이용약관
                </Link>
                <i className='w-[.1rem] h-[1rem] bg-[var(--moneed-gray-8)]'></i>
                <Link to='' className='text-[var(--moneed-gray-8)] text-[1.2rem] font-semibold leading-[135%]'>
                    개인정보처리방침
                </Link>
                <i className='w-[.1rem] h-[1rem] bg-[var(--moneed-gray-8)]'></i>
                <Link to='' className='text-[var(--moneed-gray-8)] text-[1.2rem] font-semibold leading-[135%]'>
                    게시판이용정책
                </Link>
                <i className='w-[.1rem] h-[1rem] bg-[var(--moneed-gray-8)]'></i>
                <Link to='' className='text-[var(--moneed-gray-8)] text-[1.2rem] font-semibold leading-[135%]'>
                    법적고지
                </Link>
            </div>
            <p className='text-[1.2rem] font-[400] leading-[135%] text-[var(--moneed-gray-8)] mt-[2.4rem] lg:hidden'>
                고객센터: moneed@example.com
            </p>
        </div>
    );
};

export default Footer;
