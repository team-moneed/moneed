"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ChatRoom {
  id: string;
  roomName?: string;
  roomCreator?: string;
  roomJoinLimitation?: number;
  createdAt?: string;
}

export default function SmarttalkPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/chat_room')
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  // 예시: 참여중인 방/인기 방 구분 (실제 로직은 로그인 유저 정보 필요)
  const myUserId = 'cmcsirrek0000u5tsp9fmo8oa'; // 실제 로그인 유저 id로 대체 필요
  const myRooms = rooms.filter(room => room.roomCreator === myUserId);
  const popularRooms = rooms.slice(0, 5); // 임시로 상위 5개 인기방

  return (
    <div className="min-h-screen bg-[#fff] px-4 pt-4 pb-8">
      {/* 나의 스맛톡 + 개설 버튼 */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#FF7A00] font-semibold text-[1.3rem]">
          <img src="/icon/smarttalk.svg" alt="스맛톡" className="w-5 h-5" />
          나의 스맛톡
        </div>
        <button
          className="bg-[#FF7A00] text-white rounded-full px-4 py-1 text-[1.1rem] font-bold"
          onClick={() => router.push('/community/chat_room/create')}
        >
          + 스맛톡 개설
        </button>
      </div>
      {/* 참여중인 스맛톡 */}
      {myRooms.length === 0 ? (
        <div className="mt-4 border border-[#FF7A00] rounded-[1.2rem] py-8 flex flex-col items-center text-[#FF7A00] text-[1.2rem]">
          <div className="mb-2">
            <svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="15" stroke="#FF7A00" strokeWidth="2" /><path d="M16 10v8M16 22h.01" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          참여중인 스맛톡이 없습니다.
        </div>
      ) : (
        <ul className="mt-4">
          {myRooms.map(room => (
            <li key={room.id} className="mb-2 border border-[#FF7A00] rounded-[1.2rem] p-4 cursor-pointer" onClick={() => router.push(`/community/chat_room/${room.id}`)}>
              <div className="font-semibold text-[1.1rem]">{room.roomName || `채팅방 ${room.id}`}</div>
            </li>
          ))}
        </ul>
      )}
      <button className="mt-3 w-full bg-[#FFF3E6] text-[#FF7A00] rounded-[.8rem] py-3 font-semibold text-[1.1rem]">나의 스맛톡 더보기</button>
      {/* 인기 톡방 */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <img src="/icon/hot.svg" alt="hot" className="w-5 h-5" />
          <span className="font-bold text-[1.2rem]">인기 톡방</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {popularRooms.map((room) => (
            <div key={room.id} className="min-w-[260px] border border-[#FF7A00] rounded-[1.2rem] p-4 bg-white flex-shrink-0 cursor-pointer" onClick={() => router.push(`/community/chat_room/${room.id}`)}>
              <div className="font-semibold text-[1.1rem] mb-2">{room.roomName || `채팅방 ${room.id}`}</div>
              <div className="text-xs text-[#888]">개설자: {room.roomCreator || '-'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
