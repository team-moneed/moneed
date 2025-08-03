import { getSession } from '@/lib/session';
import PostService from '@/services/post.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const stockId = req.nextUrl.searchParams.get('stockId');
        const cursor = req.nextUrl.searchParams.get('cursor');
        const limit = req.nextUrl.searchParams.get('limit');
        const payload = await getSession();

        const postService = new PostService();

        if (!stockId) {
            return NextResponse.json({ error: 'stockId is required' }, { status: 400 });
        }

        const postThumbnailList = await postService.getPostsWithUserExtended({
            stockId: Number(stockId),
            limit: limit ? Number(limit) : 15,
            cursor: cursor ? new Date(cursor) : new Date(),
            userId: payload?.userId,
        });

        return NextResponse.json(postThumbnailList);
    } catch (error) {
        console.error('게시글 조회 오류', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// 게시글 작성
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const stockId = Number(formData.get('stockId'));
    const thumbnailImage = formData.get('thumbnailImage') as File;

    const payload = await getSession();
    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const postService = new PostService();
    const post = await postService.createPost({
        userId: payload.userId,
        title,
        content,
        stockId,
        thumbnailImage,
    });

    return NextResponse.json(
        { message: '게시글이 작성되었습니다.', stockId: post.stockId, postId: post.id },
        { status: 201 },
    );
}
