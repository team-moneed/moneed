import PostRepository from '@/repositories/post.repository';

export default class PostService {
    private readonly postRepository = new PostRepository();

    // 24시간 내 게시판 순위 조회 (게시글 수 > 조회수 > 좋아요수 > 댓글수)
    async getBoardRank({ limit }: { limit: number }) {
        const boardRankWithInHours = await this.postRepository.getBoardRankWithInHours({ limit, hours: 24 });
        if (boardRankWithInHours.length === limit) {
            return boardRankWithInHours;
        } else {
            const boardRank = await this.postRepository.getBoardRank({
                offset: boardRankWithInHours.length,
                limit: limit - boardRankWithInHours.length,
            });
            return [...boardRankWithInHours, ...boardRank];
        }
    }

    async getBoardTopPosts({ boardId, limit }: { boardId: number; limit: number }) {
        const postList = await this.postRepository.getPostsWithUser({ stockId: boardId, limit });
        return postList;
    }
}
