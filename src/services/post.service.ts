import PostRepository from '@/repositories/post.repository';
import { HotPostThumbnail, PostThumbnail, TopPostThumbnail } from '@/types/post';

export default class PostService {
    private readonly postRepository = new PostRepository();

    // 24시간 내 게시판 순위 조회 (게시글 수 > 조회수 > 좋아요수 > 댓글수)
    async getBoardRank({ limit }: { limit: number }) {
        const boardRank = await this.postRepository.getBoardRank({ limit });
        return boardRank;
    }

    async getBoardTopPosts({ boardId, limit }: { boardId: number; limit: number }) {
        const postList = await this.postRepository.getPostsWithUser({ stockId: boardId, limit });
        return postList;
    }

    async getTopPosts({ limit = 5 }: { limit?: number } = {}): Promise<TopPostThumbnail[]> {
        const postList = await this.postRepository.getPostsByScore({ limit });

        const postThumbnailList: TopPostThumbnail[] = postList.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            user: {
                id: post.user.id,
                nickname: post.user.nickname,
                profileImage: post.user.profileImage,
            },
            score: post.score,
        }));

        return postThumbnailList;
    }

    async getHotPosts({
        limit = 15,
        cursor = 0,
        userId,
    }: { limit?: number; cursor?: number; userId?: string } = {}): Promise<HotPostThumbnail[]> {
        const postList = await this.postRepository.getPostsByScore({ limit, cursor });

        const postThumbnailList: HotPostThumbnail[] = postList.map(post => ({
            ...post,
            isLiked: post.postLikes.some(like => like.userId === userId),
            likeCount: post.postLikes.length,
            commentCount: post.comments.length,
            stocktype: post.stock.name,
            thumbnailImage: undefined,
        }));
        return postThumbnailList;
    }

    async getPostsWithUserExtended({
        stockId,
        cursor = new Date(),
        limit = 15,
        userId,
    }: {
        stockId: number;
        cursor?: Date;
        limit?: number;
        userId?: string;
    }): Promise<PostThumbnail[]> {
        const postList = await this.postRepository.getPostsWithUserExtended({ stockId, cursor, limit, userId });
        const postThumbnailList: PostThumbnail[] = postList.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt.toISOString(),
            isLiked: userId ? post.postLikes.some(like => like.userId === userId) : false,
            likeCount: post.postLikes.length,
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
