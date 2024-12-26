import MobileNavLink from "../MobileNavLink"

const MobileNav = () => {
    return (
        <>
            <div className="flex fixed bottom-0 left-0 right-0 z-[10] pt-[.6rem] pb-4 px-8 bg-[var(--moneed-gray-3)] lg:hidden">
                <MobileNavLink
                    to="/"
                    icon="/src/assets/icon/icon-m-nav-1.svg"
                    activeIcon="/src/assets/icon/icon-lnb-1-on.svg"
                    active={true}
                >
                    홈페이지
                </MobileNavLink>
                <MobileNavLink
                    to="/"
                    icon="/src/assets/icon/icon-m-nav-2.svg"
                    activeIcon="/src/assets/icon/icon-lnb-2-on.svg"
                >
                    숏폼
                </MobileNavLink>
                <MobileNavLink
                    to="/community"
                    icon="/src/assets/icon/icon-m-nav-3.svg"
                    activeIcon="/src/assets/icon/icon-lnb-3-on.svg"
                >
                    커뮤니티
                </MobileNavLink>
                <MobileNavLink
                    to="/mypage"
                    icon="/src/assets/icon/icon-lnb-4.svg"
                    activeIcon="/src/assets/icon/icon-lnb-4-on.svg"
                >
                    내프로필
                </MobileNavLink>

                <button
                    type="button"
                    className="aspect-[1/1] w-[5.2rem] bg-[var(--moneed-brand-color)] absolute bottom-[calc(100%+2rem)] flex items-center justify-center rounded-full right-[2rem]"
                >
                    <img src="/src/assets/icon/icon-edit.svg" alt="" />
                </button>
            </div>
        </>
    );
};

export default MobileNav;