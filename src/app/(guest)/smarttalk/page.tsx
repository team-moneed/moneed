import React from 'react';

const dummyRooms = [
  {
    title: '반도체 관련주 의견 받는다! 참견 좀 해줘',
    top: true,
    users: [
      { name: '랜덤닉네임글자수최대', time: 'N분 전', comment: '그냥 내 생각을 여기에 쓰면되나? 지금은 좀 늦었다...' },
      { name: '신나는주황색', time: 'N분 전', comment: '의견이 보이는 란입니다.' },
    ],
  },
  {
    title: '2차전지 주식방',
    top: false,
    users: [
      { name: '주식왕', time: 'N분 전', comment: '2차전지 요즘 핫하죠?' },
    ],
  },
];

export default function SmarttalkPage() {
  return (
    <div className="min-h-screen bg-[#fff] px-4 pt-4 pb-8">
      {/* 나의 스맛톡 + 개설 버튼 */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#FF7A00] font-semibold text-[1.3rem]">
          <img src="/icon/smarttalk.svg" alt="스맛톡" className="w-5 h-5" />
          나의 스맛톡
        </div>
        <button className="bg-[#FF7A00] text-white rounded-full px-4 py-1 text-[1.1rem] font-bold">+ 스맛톡 개설</button>
      </div>
      {/* 참여중인 스맛톡 없음 */}
      <div className="mt-4 border border-[#FF7A00] rounded-[1.2rem] py-8 flex flex-col items-center text-[#FF7A00] text-[1.2rem]">
        <div className="mb-2">
          <svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="15" stroke="#FF7A00" strokeWidth="2" /><path d="M16 10v8M16 22h.01" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        참여중인 스맛톡이 없습니다.
      </div>
      <button className="mt-3 w-full bg-[#FFF3E6] text-[#FF7A00] rounded-[.8rem] py-3 font-semibold text-sdsdsn[1.1rem]">나의 스맛톡 더보기</button>
      {/* 인기 톡방 */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <img src="/icon/hot.svg" alt="hot" className="w-5 h-5" />
          <span className="font-bold text-[1.2rem]">인기 톡방</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {dummyRooms.map((room, idx) => (
            <div key={idx} className="min-w-[260px] border border-[#FF7A00] rounded-[1.2rem] p-4 bg-white flex-shrink-0">
              {room.top && <div className="mb-1 text-xs text-[#FF7A00] font-bold">Top 🔥</div>}
              <div className="font-semibold text-[1.1rem] mb-2">{room.title}</div>
              {room.users.map((user, i) => (
                <div key={i} className="flex items-center gap-2 text-[.95rem] mb-1">
                  <span className="text-[#FF7A00] font-bold">{user.name}</span>
                  <span className="text-[#FF7A00]">• {user.time}</span>
                  <span className="text-[#888]">{user.comment}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
