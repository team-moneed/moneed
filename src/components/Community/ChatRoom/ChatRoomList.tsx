import React, { useEffect, useState } from 'react';

// chat_room 타입 정의
interface ChatRoom {
  id: string;
  roomName?: string;
  roomCreator?: string;
  roomJoinLimitation?: number;
  createdAt?: string;
}

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    fetch('/api/chat_room')
      .then(res => res.json())
      .then(data => setChatRooms(data));
  }, []);

  return (
    <div>
      <h2>채팅방 목록</h2>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <a href={`/community/chat_room/${room.id}`}>{room.roomName || `채팅방 ${room.id}`}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList; 