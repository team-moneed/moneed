import React from 'react';

const ChatMessageList = ({ messages }: { messages: { id: string; sender: string; content: string }[] }) => {
  return (
    <div style={{ minHeight: 200, maxHeight: 400, overflowY: 'auto', background: '#fafafa', padding: 8 }}>
      {messages.map(msg => (
        <div key={msg.id} style={{ margin: '8px 0' }}>
          <b>{msg.sender}:</b> {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList; 