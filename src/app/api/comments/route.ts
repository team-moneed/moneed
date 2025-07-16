import { getSession } from '@/lib/session';
import CommentService from '@/services/comment.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { postId, content } = await req.json();
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const commentService = new CommentService();
    const comment = await commentService.createComment({ postId, content, userId: session.userId });

    return NextResponse.json(comment, { status: 201 });
}
