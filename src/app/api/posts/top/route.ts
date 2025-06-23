import PostService from '@/services/post.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const limit = Number(req.nextUrl.searchParams.get('limit')) || 10;
        const stockId = Number(req.nextUrl.searchParams.get('stockId')) || null;

        const postService = new PostService();

        if (stockId) {
            const postList = await postService.getPostsWithUser({ stockId, limit });
            return NextResponse.json(postList);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('게시글 조회 오류', error);
        return NextResponse.json({ error: '게시글 조회 오류' }, { status: 500 });
    }
}
