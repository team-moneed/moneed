import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ErrorPage = () => {
    const navigate = useNavigate();

    const movetoMain = () => {
        navigate(`/`);
    };

    return (
        <div className="px-[2rem] max-w-[128rem] mx-auto">
            <div className="flex justify-center items-center mt-[6.3rem]">
                <img src="/errorcta.svg" alt="" className="w-[29rem]" />
            </div>
            <div className="text-[2.4rem] text-[var(--moneed-black)] font-[700] text-center mt-[2rem] leading-[140%]">
                404: 페이지를 찾을 수 없어요.
            </div>
            <div className="text-[var(--moneed-black)] text-center mt-[1.2rem] font-[600] leading-[140%]">
                죄송합니다! 존재하지 않는 페이지에요.
                <br />
                요청하신 페이지가 사라졌거나, 잘못된 경로로
                <br />
                접근이 되었어요.
            </div>
            <div className="flex justify-center items-center my-[4rem]">
                <Button
                    onClick={movetoMain}
                    theme="primary"
                    textcolor="primary"
                    className="text-[1.6rem] font-[700] leading-[140%] px-[14.5rem] py-[1.8rem]"
                >
                    메인홈으로 이동
                </Button>
            </div>
            <div className="text-[var(--moneed-gray-7)] font-[400] text-center text-[1.4rem] leading-[140%]">
                오류상황 메일신고: help@moneed.kr
            </div>
        </div>
    );
};

export default ErrorPage;
