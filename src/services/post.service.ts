import PostRepository from '@/repositories/post.repository';
import { PostThumbnail } from '@/types/post';

export default class PostService {
    private readonly postRepository = new PostRepository();

    // 24시간 내 게시판 순위 조회 (게시글 수 > 조회수 > 좋아요수 > 댓글수)
    async getBoardRank({ limit }: { limit: number }) {
        const boardRank = await this.postRepository.getBoardRank({ limit });
        return boardRank;
    }

    // 게시판별 게시글 조회
    async getPostsWithUser({ stockId, limit }: { stockId: number; limit: number }) {
        const postList = await this.postRepository.getPostsWithUser({ stockId, limit });
        return postList;
    }

    async getPostsWithUserExtended({
        stockId,
        cursor = 0,
        limit = 15,
        userId,
    }: {
        stockId: number;
        cursor?: number;
        limit?: number;
        userId?: string;
    }): Promise<PostThumbnail[]> {
        const postList = await this.postRepository.getPostsWithUserExtended({ stockId, cursor, limit, userId });
        const postThumbnailList: PostThumbnail[] = postList.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt.toISOString(),
            isLiked: userId ? post.likePosts.some(like => like.userId === userId) : false,
            likeCount: post.likes,
            commentCount: post.comments.length,
            stocktype: post.stock.name,
            thumbnailImage: post.thumbnailImage ?? undefined,
            user: {
                id: post.user.id,
                nickname: post.user.nickname,
                profileImage: post.user.profileImage,
            },
        }));
        return postThumbnailList;
    }
}
