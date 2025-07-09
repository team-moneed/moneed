import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(roomId: string, onMessage: (msg: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 소켓 연결 (roomId별 네임스페이스는 path로 구분)
    const socket = io({
      path: '/api/socket',
      transports: ['websocket'],
    });
    socketRef.current = socket;

    // 방 입장(옵션)
    socket.emit('join', roomId);

    // 메시지 수신
    socket.on('chat message', onMessage);

    return () => {
      socket.off('chat message', onMessage);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  // 메시지 전송 함수 반환
  const sendMessage = (msg: any) => {
    socketRef.current?.emit('chat message', msg);
  };

  return { sendMessage };
} 