import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

// 메시지 목록 조회
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const roomId = BigInt(params.id);
  const messages = await prisma.chat_message.findMany({
    where: { roomId },
    orderBy: { createdAt: 'asc' },
    include: { users: true },
  });
  return NextResponse.json(messages);
}

// 메시지 전송
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const roomId = BigInt(params.id);
  const { senderId, content } = await req.json();
  const message = await prisma.chat_message.create({
    data: {
      roomId,
      senderId,
      content,
    },
    include: { users: true },
  });
  return NextResponse.json(message);
} 