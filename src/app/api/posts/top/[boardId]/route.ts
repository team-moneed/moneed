import PostService from '@/services/post.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ boardId: string }> }) {
    try {
        const limit = Number(request.nextUrl.searchParams.get('limit')) || 10;
        const boardId = Number((await params).boardId);

        const postService = new PostService();

        const postList = await postService.getBoardTopPosts({ boardId, limit });

        return NextResponse.json(postList);
    } catch (error) {
        console.error('게시글 조회 오류', error);
        return NextResponse.json({ error: '게시글 조회 오류' }, { status: 500 });
    }
}
