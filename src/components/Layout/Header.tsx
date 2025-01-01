import Button from "../Button"
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="flex items-center justify-between shrink-0 self-stretch px-[1.8rem] pb-[1.2rem] pt-[2rem] sticky top-0 z-[10] bg-white">
                <Link to="/">
                    <div className="flex">
                        <div className="w-[2.8rem] h-[2.8rem] bg-[var(--moneed-black)] rounded-full flex items-center justify-center">
                            <img className="w-[1.4rem] h-[1.2rem]" src="/src/assets/icon/icon-logo.svg" alt="" />
                        </div>
                        <span className="font-[600] leading-[140%] text-[1.8rem] ml-[.8rem]">moneed</span>
                    </div>
                </Link>
                <Link
                    to="/shortform"
                >
                    <span
                        className="hidden lg:block lg:text-[1.4rem] font-semibold ml-[2.6rem]"
                    >
                        숏폼
                    </span>
                </Link>
                <Link
                    to="/community"
                >
                    <span
                        className="hidden lg:block lg:text-[1.4rem] font-semibold w-[8.4rem] ml-[2.4rem]"
                    >
                        커뮤니티
                    </span>
                </Link>
                <div className="flex items-center gap-[2.4rem] ml-auto">
                    <Link
                        to="/mypage"
                    >
                        <div className="hidden lg:block">
                            <img className="w-[2.4rem] h-[2.4rem]" src="/src/assets/icon/icon-profile-circle.svg" alt="" />
                        </div>
                    </Link>
                    <img className="w-[2.4rem] h-[2.4rem]" src="/src/assets/icon/icon-alarm.svg" alt="" />
                    <Button className="hidden lg:flex gap-[1rem] px-[2.4rem] py-[.8rem] rounded-[.8rem] items-center" theme="primary">
                        <img className="w-[1.8rem] h-[1.8rem]" src="/src/assets/icon/icon-edit.svg" alt="" />
                        <span className="font-[600] leading-[135%] text-[1.4rem]">포스팅</span>
                    </Button>
                </div>
            </div >
        </>
    )
}

export default Header
