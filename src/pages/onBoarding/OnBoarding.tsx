import Button from "../../components/Button";

const OnBoarding = () => {

    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = "";

    const handleKakaoLogin = () => {
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = kakaoAuthUrl;
    };


    return (
        <>
            <div className="relative h-[100vh] overflow-hidden px-[1.8rem] pt-8 bg-[url('/src/assets/line-bg.png')] bg-[length:8rem_8rem] lg:bg-[url('/src/assets/line-bg-pc.png')]">
                <div className="flex">
                    <div
                        className="w-[2.8rem] h-[2.8rem] bg-[var(--moneed-black)] rounded-full flex items-center justify-center">
                        <img className="w-[1.4rem] h-[1.2rem]" src="/src/assets/icon/icon-logo.svg" alt="" />
                    </div>
                    <span className="font-[600] leading-[140%] text-[1.8rem] ml-[.8rem]">moneed</span>
                </div>
                <div className="pt-[14.3rem]">
                    <div className="relative z-[2] text-[3.2rem] text-[var(--moneed-black)] font-[700] leading-[145%]">
                        당신의 니즈를<br />
                        충족하는 투자의<br />
                        시작, 머니드
                    </div>
                    <div className="z-[2] absolute bottom-[8rem] left-0 right-0 px-[2rem] lg:sticky lg:mt-[1.6rem] lg:px-0">
                        <Button type="submit" theme="primary" textcolor="primary"
                            className="w-full flex items-center justify-center h-[5.6rem] gap-[1.8rem] text-[1.6rem]  px-[4rem] font-[700] leading-[140%] rounded-[1.6rem] lg:w-auto" onClick={handleKakaoLogin}>
                            <img src="/src/assets/logo-kakao.svg" alt="" />
                            카카오로 시작하기
                        </Button>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 h-full left-0 lg:hidden">
                    <img src="/src/assets/onboarding-arrow.svg" alt="" className="absolute bottom-0 right-0" />
                    <img src="/src/assets/onboarding-square1.svg" alt="" className="absolute right-[-4rem] bottom-[35rem] w-[16.6rem]" />
                    <img src="/src/assets/onboarding-square2.svg" alt="" className="absolute right-[6.8rem] bottom-[15.2rem] w-[14.7rem]" />
                </div>
                <div className="hidden absolute bottom-0 right-0 h-full left-0 lg:block">
                    <img src="/src/assets/onboarding-arrow-pc.svg" alt="" className="absolute top-[4rem] right-0" />
                    <img src="/src/assets/onboarding-square1.svg" alt=""
                        className="absolute right-[6rem] top-[25rem] w-[22rem]" />
                    <img src="/src/assets/onboarding-square2.svg" alt=""
                        className="absolute right-[29.2rem] top-[64.6rem] w-[22rem]" />
                </div>
            </div>
        </>
    );
};

export default OnBoarding;