import React, { useState } from 'react';

const ChatMessageInput = ({ onSend }: { onSend: (content: string) => void }) => {
  const [value, setValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="메시지를 입력하세요"
        style={{ flex: 1 }}
      />
      <button type="submit">전송</button>
    </form>
  );
};

export default ChatMessageInput; 