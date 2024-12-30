import Button from "../../components/Button";
import Modal from "../../components/Modal";

const OnBoarding = () => {
    return (
        <>
            <div className="flex">
                <div className="w-[2.8rem] h-[2.8rem] bg-[var(--moneed-black)] rounded-full flex items-center justify-center">
                    <img className="w-[1.4rem] h-[1.2rem]" src="/src/assets/icon/icon-logo.svg" alt="" />
                </div>
                <span className="font-[600] leading-[140%] text-[1.8rem] ml-[.8rem]">moneed</span>
            </div>
            <div className="text-[3.2rem] text-[var(--moneed-black)] font-[700] leading-[145%]">
                당신의 니즈를<br />
                충족하는 투자의<br />
                시작, 머니드
            </div>
            <img src="/src/assets/onboarding-arrow.svg" alt="" className="w-full h-full object-cover" />
            <img src="/src/assets/onboarding-square1.svg" alt="" className="w-full h-full object-cover" />
            <img src="/src/assets/onboarding-square2.svg" alt="" className="w-full h-full object-cover" />
            <Button type="submit" theme="primary" textcolor="primary"
                className="bottom-[1.9rem] absolute text-[1.6rem] font-[700] leading-[140%] rounded-[1.6rem] px-[15.1rem] py-[1.8rem]" >카카오로 시작하기</Button>
        </>
    );
};

export default OnBoarding;