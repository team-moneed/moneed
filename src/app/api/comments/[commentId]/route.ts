import { getSession } from '@/lib/session';
import CommentService from '@/services/comment.service';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ commentId: string }> }) {
    const { commentId } = await params;
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const commentService = new CommentService();
    await commentService.deleteComment({ commentId: Number(commentId), userId: session.userId });

    return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });
}
