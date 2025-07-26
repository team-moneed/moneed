import PostService from '@/services/post.service';
import { getSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';
import { isFile } from '@/util/typeChecker';

export async function GET(_: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
    const { postId } = await params;
    const payload = await getSession();
    const postService = new PostService();
    const post = await postService.getPost({ userId: payload?.userId, postId: Number(postId) });
    return NextResponse.json(post);
}

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
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const thumbnailImage = formData.get('thumbnailImage') as File | '' | null;
    const prevThumbnailImageUrl = formData.get('prevThumbnailImageUrl') as string | null;

    let parsedThumbnailImage: File | null | undefined;
    if (isFile(thumbnailImage)) {
        parsedThumbnailImage = thumbnailImage;
    } else if (thumbnailImage === '') {
        parsedThumbnailImage = null;
    } else {
        parsedThumbnailImage = undefined;
    }

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
        thumbnailImage: parsedThumbnailImage,
        prevThumbnailImageUrl: prevThumbnailImageUrl ?? undefined,
    });
    return NextResponse.json(
        { message: '게시글이 수정되었습니다.', stockId: post.stockId, postId: post.id },
        { status: 200 },
    );
}
