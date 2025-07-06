import PostRepository from '@/repositories/post.repository';

export default class PostService {
    private readonly postRepository = new PostRepository();

    // 24시간 내 게시판 순위 조회 (게시글 수 > 조회수 > 좋아요수 > 댓글수)
    async getBoardRank({ limit }: { limit: number }) {
        const boardRank = await this.postRepository.getBoardRank({ limit });
        return boardRank;
    }

    // 게시판별 게시글 조회
    async getPostsWithUserByStockId({ stockId, limit }: { stockId: number; limit: number }) {
        const postList = await this.postRepository.getPostsWithUserByStockId({ stockId, limit });
        return postList;
    }
}
