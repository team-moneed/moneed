import React, { useState } from 'react';

const ChatRoomCreateForm = ({ onCreate }: { onCreate?: (data: { roomName: string; roomCreator: string; roomJoinLimitation: number }) => void }) => {
  const [roomName, setRoomName] = useState('');
  const [roomCreator, setRoomCreator] = useState('');
  const [roomJoinLimitation, setRoomJoinLimitation] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCreate) onCreate({ roomName, roomCreator, roomJoinLimitation });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="채팅방 이름을 입력해주세요"
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="개설자(유저ID)를 입력해주세요"
        value={roomCreator}
        onChange={e => setRoomCreator(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="최대 인원"
        value={roomJoinLimitation}
        onChange={e => setRoomJoinLimitation(Number(e.target.value))}
        min={1}
        required
      />
      <button type="submit">개설</button>
    </form>
  );
};

export default ChatRoomCreateForm; 