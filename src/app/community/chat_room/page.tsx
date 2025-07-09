import ChatRoomList from '@/components/Community/ChatRoom/ChatRoomList';

export default function ChatRoomListPage() {
  return (
    <main style={{ padding: 24 }}>
      <ChatRoomList />
      <a href="/community/chat_room/create" style={{ display: 'block', marginTop: 24, color: 'orange' }}>
        + 채팅방 개설하기
      </a>
    </main>
  );
} 