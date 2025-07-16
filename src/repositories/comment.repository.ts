import prisma from '@/lib/prisma';

export default class CommentRepository {
    private prisma = prisma;

    async createComment({ postId, content, userId }: { postId: number; content: string; userId: string }) {
        return this.prisma.comment.create({
            data: { postId, content, userId },
        });
    }
}
