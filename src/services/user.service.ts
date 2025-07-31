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

    async updateUserProfile({
        userId,
        nickname,
        profileImage,
    }: {
        userId: string;
        nickname: string;
        profileImage: string;
    }) {
        const isDuplicate = await this.isDuplicateNickname({ userId, nickname });
        if (isDuplicate) {
            throw new Error('이미 존재하는 닉네임입니다.');
        }

        return this.userRepository.update(userId, { nickname, profileImage });
    }

    async isDuplicateNickname({ userId, nickname }: { userId: string; nickname: string }) {
        const user = await this.userRepository.findByNickname(nickname);
        if (user && user.id !== userId) {
            return true;
        }
        return false;
    }
}

export default UserService;
