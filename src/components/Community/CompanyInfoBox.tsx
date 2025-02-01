const CompanyInfoBox = () => {
    return (
        <>
            <div className="px-[1.2rem] py-[1.6rem] flex items-center gap-[1rem] bg-[var(--moneed-black-3)] border border-solid border-[var(--moneed-gray-5)] rounded-[1.6rem]">
                <div className="overflow-hidden aspect-[1/1] w-[2.4rem]">
                    <img src="/icon/icon-bulb.svg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="text-[1.4rem] font-[400] leading-[140%] text-[var(--moneed-black)]">
                    유나이티드 헬스 그룹(UNH)는 건강 및 후생 관련 사업을 진행하는 회사입니다.
                </div>
            </div>
        </>
    );
};

export default CompanyInfoBox;