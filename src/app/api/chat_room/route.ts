import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

// 채팅방 목록 조회
export async function GET(req: NextRequest) {
  const rooms = await prisma.chat_room.findMany({
    orderBy: { createdAt: 'desc' }
  });
  // BigInt를 string으로 변환
  const safeRooms = rooms.map(room => ({
    ...room,
    id: room.id.toString(),
    roomCreator: room.roomCreator ? room.roomCreator.toString() : null,
    roomJoinLimitation: room.roomJoinLimitation ?? null,
  }));
  return NextResponse.json(safeRooms);
}

// 채팅방 생성
export async function POST(req: NextRequest) {
  let { roomName, roomCreator, roomJoinLimitation } = await req.json();
  // roomCreator가 string이면 BigInt로 변환
  if (roomCreator) roomCreator = BigInt(roomCreator);
  const room = await prisma.chat_room.create({
    data: {
      roomName,
      roomCreator,
      roomJoinLimitation,
    },
  });
  // 반환 시 BigInt를 string으로 변환
  return NextResponse.json({
    ...room,
    id: room.id.toString(),
    roomCreator: room.roomCreator ? room.roomCreator.toString() : null,
    roomJoinLimitation: room.roomJoinLimitation ?? null,
  });
} 