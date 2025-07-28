import prisma from '@/lib/prisma';

export default class CommentRepository {
    private prisma = prisma;

    async createComment({ postId, content, userId }: { postId: number; content: string; userId: string }) {
        return this.prisma.comment.create({
            data: { postId, content, userId },
        });
    }

    async deleteComment({ commentId, userId }: { commentId: number; userId: string }) {
        return this.prisma.comment.delete({
            where: { id: commentId, userId },
        });
    }

    async updateComment({ commentId, content }: { commentId: number; content: string }) {
        return this.prisma.comment.update({
            where: { id: commentId },
            data: { content },
        });
    }
}
