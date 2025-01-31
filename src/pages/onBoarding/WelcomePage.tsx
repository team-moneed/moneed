import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto">
                <div className="text-[2.4rem] text-[var(--moneed-black)] font-[700] text-center mt-[9rem] leading-[140%]">
                    랜덤닉네임님,<br />
                    회원가입을 축하합니다.
                </div>
                <div className="text-[1.4rem] text-[var(--moneed-gray-7)] text-center mt-[1.6rem] font-[400] leading-[140%]">
                    2초 뒤 자동으로 페이지가 전환됩니다.
                </div>
                <div className="flex justify-center items-center mt-[2rem]">
                    <img src="/src/assets/welcome.svg" alt="" className="w-[29rem]" />
                </div>
            </div>
        </>

    );
};

export default WelcomePage;