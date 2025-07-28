import PostRepository from '@/repositories/post.repository';
import {
    CreatePostRequest,
    HotPostThumbnail,
    PostDetail,
    PostThumbnail,
    TopPostThumbnail,
    UpdatePostRequest,
} from '@/types/post';
import S3Service from './s3.service';
import { urlToS3FileName } from '@/util/parser';

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
            stock: {
                id: post.stock.id,
                name: post.stock.name,
            },
        }));

        return postThumbnailList;
    }

    async getHotPosts({
        limit = 15,
        cursor = 0,
        userId,
    }: { limit?: number; cursor?: number; userId?: string } = {}): Promise<HotPostThumbnail[]> {
        const postList = await this.postRepository.getPostsByScore({ limit, cursor });

        const postThumbnailList = postList.map(post => ({
            ...post,
            isLiked: post.postLikes.some(like => like.userId === userId),
            likeCount: post.postLikes.length,
            commentCount: post.comments.length,
            stock: {
                id: post.stock.id,
                name: post.stock.name,
            },
            thumbnailImage: post.thumbnailImage ?? undefined,
        }));
        return postThumbnailList;
    }

    async getPost({ userId, postId }: { userId?: string; postId: number }): Promise<PostDetail> {
        const post = await this.postRepository.getPost({ postId });
        if (!post) {
            throw new Error('Post not found');
        }
        return {
            ...post,
            createdAt: post.createdAt,
            isLiked: post.postLikes.some(like => like.userId === userId),
            likeCount: post.postLikes.length,
            comments: post.comments,
            thumbnailImage: post.thumbnailImage ?? undefined,
            user: {
                id: post.user.id,
                nickname: post.user.nickname,
                profileImage: post.user.profileImage,
            },
            stock: {
                id: post.stock.id,
                name: post.stock.name,
            },
        };
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
        const postList = await this.postRepository.getPostsWithUserExtended({ stockId, cursor, limit });
        const postThumbnailList: PostThumbnail[] = postList.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt.toISOString(),
            isLiked: post.postLikes.some(like => like.userId === userId),
            likeCount: post.postLikes.length,
            commentCount: post.comments.length,
            stock: {
                id: post.stock.id,
                name: post.stock.name,
            },
            thumbnailImage: post.thumbnailImage ?? undefined,
            user: {
                id: post.user.id,
                nickname: post.user.nickname,
                profileImage: post.user.profileImage,
            },
        }));
        return postThumbnailList;
    }

    async createPost({ userId, title, content, stockId, thumbnailImage }: CreatePostRequest & { userId: string }) {
        const s3Service = new S3Service();
        let uploadedImageUrl: string | undefined;
        if (thumbnailImage) {
            uploadedImageUrl = await s3Service.uploadPostImage(thumbnailImage);
        }

        const post = await this.postRepository.createPost({
            userId,
            title,
            content,
            stockId,
            thumbnailImage: uploadedImageUrl,
        });
        return post;
    }

    async deletePost({ postId, userId }: { postId: number; userId: string }) {
        const postImageUrl = await this.postRepository.getPostImageUrl({ postId });
        if (postImageUrl?.thumbnailImage) {
            await this.deletePrevThumbnailImage({ prevThumbnailImageUrl: postImageUrl.thumbnailImage });
        }
        return await this.postRepository.deletePost({ postId, userId });
    }

    async updatePost({
        postId,
        userId,
        title,
        content,
        thumbnailImage,
        prevThumbnailImageUrl,
    }: UpdatePostRequest & { userId: string }) {
        const thumbnailImageUrl = await this.getThumbnailImageUrl({
            thumbnailImage,
        });

        // 썸네일 이미지를 교체했거나 제거한 경우 이전 썸네일 이미지 삭제
        if (thumbnailImageUrl || thumbnailImage === null) {
            await this.deletePrevThumbnailImage({ prevThumbnailImageUrl });
        }

        return await this.postRepository.updatePost({
            postId,
            userId,
            title,
            content,
            thumbnailImageUrl,
        });
    }

    async getThumbnailImageUrl({ thumbnailImage }: { thumbnailImage?: File | null }) {
        const s3Service = new S3Service();
        if (thumbnailImage instanceof File) {
            return await s3Service.uploadPostImage(thumbnailImage);
        }
        return thumbnailImage;
    }

    async deletePrevThumbnailImage({ prevThumbnailImageUrl }: { prevThumbnailImageUrl?: string | null }) {
        const s3Service = new S3Service();
        if (prevThumbnailImageUrl) {
            const fileName = urlToS3FileName(prevThumbnailImageUrl);
            await s3Service.deletePostImage(fileName);
        }
    }
}
