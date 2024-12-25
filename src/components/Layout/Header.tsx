import Button from "../Button"
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="flex items-center justify-between shrink-0 self-stretch px-[1.8rem] pb-[1.2rem] pt-[2rem]">
                <Link to="/">
                    <div className="lg:hidden w-[2.8rem] h-[2.8rem] bg-[var(--moneed-black)] rounded-full flex items-center justify-center">
                        <img className="w-[1.4rem] h-[1.2rem]" src="/src/assets/icon/icon-logo.svg" alt="" />
                    </div>
                </Link>
                <div className="flex items-center gap-[2.4rem] ml-auto">
                    <img className="w-[2.4rem] h-[2.4rem]" src="/src/assets/icon/icon-alarm.svg" alt="" />
                    <Button className="hidden lg:flex gap-[1rem] px-[2.4rem] py-[.8rem] rounded-[.8rem] items-center" theme="primary">
                        <img className="w-[1.8rem] h-[1.8rem]" src="/src/assets/icon/icon-edit.svg" alt="" />
                        <span className="font-[600] leading-[135%] text-[1.4rem]">포스팅</span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Header
