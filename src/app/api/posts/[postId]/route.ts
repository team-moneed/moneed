import PostService from '@/services/post.service';
import { getSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
    const { postId } = await params;
    const payload = await getSession();
    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const postService = new PostService();
    const post = await postService.deletePost({ postId: Number(postId), userId: payload.userId });
    return NextResponse.json(
        { message: '게시글이 삭제되었습니다.', stockId: post.stockId, postId: post.id },
        { status: 200 },
    );
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
    const { postId } = await params;
    const { title, content, thumbnailImage } = (await req.json()) as {
        title: string;
        content: string;
        thumbnailImage?: string | null;
    };
    const payload = await getSession();
    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const postService = new PostService();
    const post = await postService.updatePost({
        postId: Number(postId),
        userId: payload.userId,
        title,
        content,
        thumbnailImage,
    });
    return NextResponse.json(
        { message: '게시글이 수정되었습니다.', stockId: post.stockId, postId: post.id },
        { status: 200 },
    );
}
