import { useState } from "react";
import Button from "../../components/Button";

const MyProfile = () => {

    const [nickname, setNickname] = useState("");

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handlesubmitNickname = () => {

    }

    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto">
                <div className="flex justify-center items-center rounded-full overflow-hidden aspect-[1/1] w-[14rem] mx-auto mt-[6rem]">
                    <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                    <div className="text-[1.6rem] font-[400] leading-[140%] text-[var(--moneed-black)] mt-[6.9rem]">닉네임</div>
                    <input
                        value={nickname}
                        onChange={handleNicknameChange}
                        className="bg-[var(--moneed-gray-4)] rounded-[1.2rem] px-[2.4rem] py-[.8rem] h-[5.4rem] w-full">
                    </input>
                </div>
                <div>
                    <li className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-7)] mt-[.8rem]">닉네임은 2-10자까지 입력하실 수 있습니다.</li>
                    <li className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-gray-7)]">한번 수정된 닉네임은 30일 뒤에 변경이 가능합니다.</li>
                </div>
                <div className="pt-[6rem]">
                    <Button theme="secondary" textcolor="secondary" className="mr-[1.6rem] border border-solid border-[var(--moneed-gray-6)] text-[1.6rem] font-[700] leading-[140%] px-[2.4rem] py-[1.8rem] ">취소</Button>
                    <Button onClick={handlesubmitNickname} theme="primary" textcolor="primary" className="text-[1.6rem] font-[700] leading-[140%] px-[14.5rem] py-[1.8rem] ">저장하기</Button>
                </div>
            </div>
        </>
    );
};

export default MyProfile;