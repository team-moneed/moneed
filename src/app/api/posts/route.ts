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
            limit: limit ? Number(limit) : undefined,
            cursor: cursor ? Number(cursor) : undefined,
            userId: payload?.userId,
        });

        return NextResponse.json(postThumbnailList);
    } catch (error) {
        console.error('게시글 조회 오류', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// 게시글 작성
// export async function POST(req: NextRequest) {
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
// const url = new URL(`/community/${stocktype}`, req.url);
//     return NextResponse.redirect(url);
// }
