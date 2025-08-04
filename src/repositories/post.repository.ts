import prisma from '@/lib/prisma';
import { BoardRankResponse } from '@/types/board';

export default class PostRepository {
    private prisma = prisma;

    async getUserPosts({ userId }: { userId: string }) {
        return this.prisma.post.findMany({
            where: { userId },
            include: {
                postLikes: true,
            },
        });
    }

    /**
     * 종목별 게시글 조회
     * @param stockId 종목 ID
     * @param limit 조회할 게시글 수
     * @returns 게시글 목록
     */
    async getPostsWithUser({ stockId, limit }: { stockId: number; limit: number }) {
        const posts = await this.prisma.post.findMany({
            where: {
                stockId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        nickname: true,
                        profileImage: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });

        return posts;
    }

    /**
     * 점수 기반 상위 게시물 조회
     * Score = (V + 3L + 5C) × 1 / (T + 2)^1.8
     * @param limit 조회할 게시글 수
     * @param cursor 점수 기준 커서
     * @returns 점수순으로 정렬된 게시글 목록
     */
    async getPostsByScore({ limit, cursor }: { limit: number; cursor?: number }) {
        const posts = await this.prisma.post.findMany({
            where: {
                score: {
                    gt: cursor === 0 ? undefined : cursor,
                },
            },
            select: {
                score: true,
                id: true,
                title: true,
                content: true,
                thumbnailImage: true,
                postViews: {
                    select: {
                        id: true,
                    },
                },
                postLikes: {
                    select: {
                        id: true,
                        userId: true,
                    },
                },
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        nickname: true,
                        profileImage: true,
                    },
                },
                stock: {
                    select: {
                        id: true,
                        name: true,
                        symbol: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {
                score: 'desc',
            },
        });

        // 각 게시물의 점수를 계산하고 정렬
        const postsWithScores = posts.map(post => {
            const score =
                post.score ||
                calcScore({
                    views: post.postViews.length,
                    likes: post.postLikes.length,
                    comments: post.comments.length,
                    createdAt: post.createdAt,
                });

            return {
                ...post,
                createdAt: post.createdAt.toISOString(),
                score,
            };
        });

        await Promise.all(postsWithScores.map(post => this.setPostsScore({ postId: post.id, score: post.score })));

        return postsWithScores.sort((a, b) => b.score - a.score).slice(0, limit);
    }

    async setPostsScore({ postId, score }: { postId: number; score: number }) {
        await this.prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                score,
            },
        });
    }

    /**
     * 종목별 게시글 조회
     * @param stockId 종목 ID
     * @param limit 조회할 게시글 수
     * @returns 게시글 목록
     */
    async getPostsWithUserByStockId({ stockId, limit }: { stockId: number; limit: number }) {
        const posts = await this.prisma.post.findMany({
            where: {
                stockId,
            },
            select: {
                title: true,
                content: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        nickname: true,
                        profileImage: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });

        return posts;
    }

    async getPostsWithUserExtended({
        stockId,
        cursor,
        limit,
        userId,
    }: {
        stockId?: number;
        cursor?: Date;
        limit?: number;
        userId?: string;
    }) {
        const posts = await this.prisma.post.findMany({
            where: {
                userId,
                stockId,
                createdAt: {
                    lt: cursor,
                },
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                thumbnailImage: true,
                postLikes: {
                    select: {
                        id: true,
                        userId: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                    },
                },
                stock: {
                    select: {
                        id: true,
                        name: true,
                        symbol: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        nickname: true,
                        profileImage: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });

        return posts;
    }

    async getBoardRankWithInHours({ limit, hours }: { limit: number; hours: number }): Promise<BoardRankResponse[]> {
        const hoursAgo = new Date(Date.now() - 1000 * 60 * 60 * hours);
        const boardsWithInHours = (await this.prisma.$queryRaw`
            SELECT 
                p."stockId",
                (SELECT s.name FROM stocks s WHERE s.id = p."stockId") as "stockName",
                (SELECT s.symbol FROM stocks s WHERE s.id = p."stockId") as "symbol",
                COUNT(DISTINCT p.id) as "postCount",
                COALESCE(
                    (SELECT COUNT(pl.id) 
                     FROM post_likes pl 
                     JOIN posts p2 ON pl."postId" = p2.id 
                     WHERE p2."stockId" = p."stockId" 
                     AND pl."createdAt" >= ${hoursAgo}), 
                    0
                ) as "totalLikes",
                COALESCE(
                    (SELECT COUNT(pv.id) 
                     FROM post_views pv 
                     JOIN posts p2 ON pv."postId" = p2.id 
                     WHERE p2."stockId" = p."stockId" 
                     AND pv."createdAt" >= ${hoursAgo}), 
                    0
                ) as "totalViews",
                COALESCE(
                    (SELECT COUNT(c.id) 
                     FROM comments c 
                     JOIN posts p2 ON c."postId" = p2.id 
                     WHERE p2."stockId" = p."stockId" 
                     AND p2."createdAt" >= ${hoursAgo}), 
                    0
                ) as "totalComments"
            FROM posts p
            WHERE p."createdAt" >= ${hoursAgo}
            GROUP BY p."stockId"
            ORDER BY "postCount" DESC, "totalViews" DESC, "totalLikes" DESC, "totalComments" DESC
            LIMIT ${limit}
        `) as Array<{
            stockId: number;
            stockName: string;
            symbol: string;
            postCount: bigint;
            totalViews: bigint;
            totalLikes: bigint;
            totalComments: bigint;
        }>;

        // BigInt를 number로 변환합니다
        return boardsWithInHours.map(item => ({
            stockId: item.stockId,
            stockName: item.stockName,
            symbol: item.symbol,
            postCount: Number(item.postCount),
            totalViews: Number(item.totalViews),
            totalLikes: Number(item.totalLikes),
            totalComments: Number(item.totalComments),
        }));
    }

    async getBoardRank({ offset, limit }: { offset: number; limit: number }): Promise<BoardRankResponse[]> {
        const boards = (await this.prisma.$queryRaw`
            SELECT 
                p."stockId",
                (SELECT s.name FROM stocks s WHERE s.id = p."stockId") as "stockName", 
                (SELECT s.symbol FROM stocks s WHERE s.id = p."stockId") as "symbol",
                COUNT(DISTINCT p.id) as "postCount",
                COALESCE(
                    (SELECT COUNT(pl.id) 
                     FROM post_likes pl 
                     JOIN posts p2 ON pl."postId" = p2.id 
                     WHERE p2."stockId" = p."stockId"), 
                    0
                ) as "totalLikes",
                COALESCE(
                    (SELECT COUNT(pv.id) 
                     FROM post_views pv 
                     JOIN posts p2 ON pv."postId" = p2.id 
                     WHERE p2."stockId" = p."stockId"), 
                    0
                ) as "totalViews",
                COALESCE(
                    (SELECT COUNT(c.id) 
                     FROM comments c 
                     JOIN posts p2 ON c."postId" = p2.id 
                     WHERE p2."stockId" = p."stockId"), 
                    0
                ) as "totalComments"
            FROM posts p
            GROUP BY p."stockId"
            ORDER BY "postCount" DESC, "totalViews" DESC, "totalLikes" DESC, "totalComments" DESC
            OFFSET ${offset}
            LIMIT ${limit}
        `) as Array<{
            stockId: number;
            stockName: string;
            symbol: string;
            postCount: bigint;
            totalViews: bigint;
            totalLikes: bigint;
            totalComments: bigint;
        }>;

        return boards.map(item => ({
            stockId: item.stockId,
            stockName: item.stockName,
            symbol: item.symbol,
            postCount: Number(item.postCount),
            totalViews: Number(item.totalViews),
            totalLikes: Number(item.totalLikes),
            totalComments: Number(item.totalComments),
        }));
    }

    async createPost({
        userId,
        title,
        content,
        stockId,
        thumbnailImage,
    }: {
        userId: string;
        title: string;
        content: string;
        stockId: number;
        thumbnailImage?: string;
    }) {
        const post = await this.prisma.post.create({
            data: {
                userId,
                title,
                content,
                stockId,
                thumbnailImage,
            },
            include: {
                stock: {
                    select: {
                        id: true,
                        name: true,
                        symbol: true,
                    },
                },
            },
        });
        return post;
    }

    async deletePost({ postId, userId }: { postId: number; userId: string }) {
        return await this.prisma.post.delete({
            where: {
                id: postId,
                userId,
            },
        });
    }

    async updatePost({
        postId,
        userId,
        title,
        content,
        thumbnailImageUrl,
    }: {
        postId: number;
        userId: string;
        title: string;
        content: string;
        thumbnailImageUrl?: string | null;
    }) {
        return await this.prisma.post.update({
            where: {
                id: postId,
                userId,
            },
            data: {
                title,
                content,
                thumbnailImage: thumbnailImageUrl,
            },
        });
    }

    async getPost({ postId }: { postId: number }) {
        return await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                thumbnailImage: true,
                postLikes: {
                    select: {
                        id: true,
                        userId: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        userId: true,
                        postId: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                nickname: true,
                                profileImage: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
                stock: {
                    select: {
                        id: true,
                        name: true,
                        symbol: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        nickname: true,
                        profileImage: true,
                    },
                },
            },
        });
    }

    async getPostImageUrl({ postId }: { postId: number }) {
        return await this.prisma.post.findUnique({
            where: { id: postId },
            select: { thumbnailImage: true },
        });
    }

    async likePost({ postId, userId }: { postId: number; userId: string }) {
        return await this.prisma.postLike.create({
            data: { postId, userId },
        });
    }

    async unlikePost({ postId, userId }: { postId: number; userId: string }) {
        return await this.prisma.postLike.delete({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
    }
}

function calcScore({
    views,
    likes,
    comments,
    createdAt,
}: {
    views: number;
    likes: number;
    comments: number;
    createdAt: Date;
}): number {
    const now = new Date();
    const timeDiffMs = now.getTime() - createdAt.getTime();
    const timeDiffDays = timeDiffMs / (1000 * 60 * 60 * 24); // 일 단위로 변환

    // Score = (V + 3L + 5C) × 1 / (T + 2)^1.8
    const score = (views + 3 * likes + 5 * comments) * (1 / Math.pow(timeDiffDays + 2, 1.8));

    return score;
}
