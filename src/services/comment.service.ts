import CommentRepository from '@/repositories/comment.repository';

export default class CommentService {
    private commentRepository = new CommentRepository();

    async createComment({ postId, content, userId }: { postId: number; content: string; userId: string }) {
        return this.commentRepository.createComment({ postId, content, userId });
    }
}
