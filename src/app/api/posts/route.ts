import prisma from '@/lib/prisma';
import PostService from '@/services/post.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const limit = Number(req.nextUrl.searchParams.get('limit')) || 10;
        const boardId = Number(req.nextUrl.searchParams.get('boardId')) || null;

        const postService = new PostService();

        if (boardId) {
            const postList = await postService.getPostsWithUserByStockId({ stockId: boardId, limit });
            return NextResponse.json(postList);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('게시글 조회 오류', error);
        return NextResponse.json({ error: '게시글 조회 오류' }, { status: 500 });
    }
}

// 게시글 작성
export async function POST(req: NextRequest) {
    // const { title, content, stocktype } = await req.json();
    // try {
    //     const post = await prisma.post.create({
    //         data: {
    //             userId: '1', // 임시 작성자 id
    //             title,
    //             content,
    //             stockId: stocktype,
    //         },
    //     });
    //     console.log('게시글 작성', post);
    // } catch (error) {
    //     console.error('게시글 작성 오류', error);
    //     return NextResponse.json({ error: '게시글 작성 오류' }, { status: 500 });
    // }
    const url = new URL(`/community/${stocktype}`, req.url);
    return NextResponse.redirect(url);
}
