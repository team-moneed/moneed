"use client";
import ChatRoomHeader from '@/components/Community/ChatRoom/ChatRoomHeader';
import ChatMessageList from '@/components/Community/ChatRoom/ChatMessageList';
import ChatMessageInput from '@/components/Community/ChatRoom/ChatMessageInput';
import { useEffect, useState } from 'react';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  users?: { nickname: string };
}

export default function ChatRoomPage({ params }: { params: { roomId: string } }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // 메시지 목록 불러오기
  useEffect(() => {
    fetch(`/api/chat_room/${params.roomId}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [params.roomId]);

  // 메시지 전송
  const handleSend = async (content: string) => {
    // senderId는 실제 로그인 유저 id로 대체 필요
    const senderId = 'cmcsirrek0000u5tsp9fmo8oa';
    const res = await fetch(`/api/chat_room/${params.roomId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId, content }),
    });
    if (res.ok) {
      const msg = await res.json();
      setMessages(prev => [...prev, msg]);
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <ChatRoomHeader title={`채팅방 ${params.roomId}`} />
      <ChatMessageList messages={messages.map(m => ({ id: String(m.id), sender: m.users?.nickname || m.senderId, content: m.content }))} />
      <div style={{ marginTop: 16 }}>
        <ChatMessageInput onSend={handleSend} />
      </div>
    </main>
  );
}
