import CommentRepository from '@/repositories/comment.repository';
import PostRepository from '@/repositories/post.repository';
import { UserRepository } from '@/repositories/user.repository';

class UserService {
    private userRepository = new UserRepository();
    private commentRepository = new CommentRepository();
    private postRepository = new PostRepository();

    async getUserInfo({ userId }: { userId: string }) {
        return this.userRepository.findById(userId);
    }

    async getUserPosts({ userId }: { userId: string }) {
        return this.postRepository.getUserPosts({ userId });
    }

    async getUserComments({ userId }: { userId: string }) {
        return this.commentRepository.getUserComments({ userId });
    }
}

export default UserService;
