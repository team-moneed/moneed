import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const formatTime = (sec: number) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
};

const SmartTalkBanner = () => {
    const [remain, setRemain] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const usOpenTime = new Date();
            const usCloseTime = new Date();

            // 미국 장 시간 (한국시간 기준)
            // 여름: 22:30 ~ 05:00+1, 겨울: 23:30 ~ 06:00+1
            const isDST = isDaylightSavingTime(now);

            if (isDST) {
                usOpenTime.setHours(22, 30, 0, 0);
                usCloseTime.setHours(5, 0, 0, 0);
                usCloseTime.setDate(usCloseTime.getDate() + 1);
            } else {
                usOpenTime.setHours(23, 30, 0, 0);
                usCloseTime.setHours(6, 0, 0, 0);
                usCloseTime.setDate(usCloseTime.getDate() + 1);
            }

            const currentTime = now.getTime();
            const openTime = usOpenTime.getTime();
            const closeTime = usCloseTime.getTime();

            if (currentTime >= openTime && currentTime <= closeTime) {
                // 장중일 때 - 활성화
                setIsActive(true);
                setRemain(Math.floor((closeTime - currentTime) / 1000));
            } else {
                // 장마감일 때 - 다음 개장까지 대기
                setIsActive(false);
                const nextOpen = currentTime > closeTime ?
                    new Date(openTime + 24 * 60 * 60 * 1000) :
                    new Date(openTime);
                setRemain(Math.floor((nextOpen.getTime() - currentTime) / 1000));
            }
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);
        return () => clearInterval(timer);
    }, []);

    // 서머타임 판별 함수
    const isDaylightSavingTime = (date: Date) => {
        const year = date.getFullYear();
        const march = new Date(year, 2, 1);
        const november = new Date(year, 10, 1);

        // 3월 두 번째 일요일
        const dstStart = new Date(year, 2, 14 - march.getDay());
        // 11월 첫 번째 일요일
        const dstEnd = new Date(year, 10, 7 - november.getDay());

        return date >= dstStart && date < dstEnd;
    };

    return (
        <div className="w-full max-w-full mx-0 rounded-none overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] mb-[2.2rem] mt-[2.2rem]">
            <div className="bg-[#F3F3F3] px-6 py-4 font-semibold text-[1.4rem] md:text-[1.8rem] flex justify-between items-center">
                <span>{isActive ? '오늘의 스맛톡이 진행중입니다' : '잠시후 오늘의 스맛톡이 오픈됩니다'}</span>
                <Link href="/smarttalk" legacyBehavior>
                  <a className="text-[#666] font-medium text-[1.3rem] md:text-[1.5rem] underline bg-none border-none cursor-pointer">
                    참여하기
                  </a>
                </Link>
            </div>
            <div className="bg-[#989898] text-white font-bold text-[1.5rem] md:text-[1.7rem] px-6 py-[1.1rem]">
                {isActive ? '마감까지' : '남은시간'} {formatTime(remain)}
            </div>
        </div>
    );
};

export default SmartTalkBanner;
