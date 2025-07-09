import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

// BigInt를 string으로 변환하는 함수
function safeMessage(msg: any) {
  return {
    ...msg,
    id: msg.id?.toString(),
    roomId: msg.roomId?.toString(),
    senderId: msg.senderId,
    createdAt: msg.createdAt,
    users: msg.users,
  };
}

// 메시지 목록 조회
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const roomId = BigInt(context.params.id);
  const messages = await prisma.chat_message.findMany({
    where: { roomId },
    orderBy: { createdAt: 'asc' },
    include: { users: true },
  });
  return NextResponse.json(messages.map(safeMessage));
}

// 메시지 전송
export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const roomId = BigInt(context.params.id);
  const { senderId, content } = await req.json();
  const message = await prisma.chat_message.create({
    data: {
      roomId,
      senderId,
      content,
    },
    include: { users: true },
  });
  return NextResponse.json(safeMessage(message));
}
