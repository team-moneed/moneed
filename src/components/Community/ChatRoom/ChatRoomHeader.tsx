import React from 'react';

const ChatRoomHeader = ({ title }: { title: string }) => {
  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
      <h3>{title}</h3>
    </div>
  );
};

export default ChatRoomHeader; 