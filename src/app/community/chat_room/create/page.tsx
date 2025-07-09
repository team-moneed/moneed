"use client";
import ChatRoomCreateForm from '@/components/Community/ChatRoom/ChatRoomCreateForm';
import { useRouter } from 'next/navigation';

export default function ChatRoomCreatePage() {
  const router = useRouter();
  const handleCreate = async (data: { roomName: string; roomCreator: string; roomJoinLimitation: number }) => {
    const res = await fetch('/api/chat_room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/community/chat_room');
    } else {
      alert('채팅방 생성 실패');
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>채팅방 개설</h2>
      <ChatRoomCreateForm onCreate={handleCreate} />
    </main>
  );
}
