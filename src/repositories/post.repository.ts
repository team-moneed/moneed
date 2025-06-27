import prisma from '@/lib/prisma';
import { BoardRankResponse } from '@/types/board';
import { TopPostThumbnail } from '@/types/post';

function calculateRank({
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

export default class PostRepository {
    private prisma = prisma;

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
     * @returns 점수순으로 정렬된 게시글 목록
     */
    async getTopPosts({ limit }: { limit: number }): Promise<(TopPostThumbnail & { score: number })[]> {
        // 모든 게시물을 조회 (최근 30일 이내)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const posts = await this.prisma.post.findMany({
            where: {
                createdAt: {
                    gte: thirtyDaysAgo,
                },
            },
            select: {
                id: true,
                title: true,
                content: true,
                postViews: {
                    select: {
                        id: true,
                    },
                },
                postLikes: {
                    select: {
                        id: true,
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
                        name: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        // 각 게시물의 점수를 계산하고 정렬
        const postsWithScores: (TopPostThumbnail & { score: number })[] = posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt.toISOString(),
            user: post.user,
            score: calculateRank({
                views: post.postViews.length,
                likes: post.postLikes.length,
                comments: post.comments.length,
                createdAt: post.createdAt,
            }),
        }));

        return postsWithScores.sort((a, b) => b.score - a.score).slice(0, limit);
    }

    async getPostsWithUserExtended({
        stockId,
        cursor,
        limit,
        userId,
    }: {
        stockId: number;
        cursor: Date;
        limit: number;
        userId?: string;
    }) {
        const posts = await this.prisma.post.findMany({
            where: {
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
                postLikes: userId
                    ? {
                          where: {
                              userId,
                          },
                      }
                    : undefined,
                comments: {
                    select: {
                        id: true,
                    },
                },
                stock: {
                    select: {
                        name: true,
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

    async getBoardRank({ limit }: { limit: number }): Promise<BoardRankResponse[]> {
        const twentyFourHoursAgo = new Date(Date.now() - 1000 * 60 * 60 * 24);
        const result = (await this.prisma.$queryRaw`
            SELECT 
                p."stockId",
                (SELECT s.name FROM stocks s WHERE s.id = p."stockId") as "stockName",
                COUNT(DISTINCT p.id) as "postCount",
                COALESCE(
                    (SELECT COUNT(pl.id) 
                     FROM post_likes pl 
                     JOIN posts p2 ON pl."postId" = p2.id 
                     WHERE p2."stockId" = p."stockId" 
                     AND pl."createdAt" >= ${twentyFourHoursAgo}), 
                    0
                ) as "totalLikes",
                COALESCE(
                    (SELECT COUNT(pv.id) 
                     FROM post_views pv 
                     JOIN posts p2 ON pv."postId" = p2.id 
                     WHERE p2."stockId" = p."stockId" 
                     AND pv."createdAt" >= ${twentyFourHoursAgo}), 
                    0
                ) as "totalViews",
                COALESCE(
                    (SELECT COUNT(c.id) 
                     FROM comments c 
                     JOIN posts p2 ON c."postId" = p2.id 
                     WHERE p2."stockId" = p."stockId" 
                     AND p2."createdAt" >= ${twentyFourHoursAgo}), 
                    0
                ) as "totalComments"
            FROM posts p
            WHERE p."createdAt" >= ${twentyFourHoursAgo}
            GROUP BY p."stockId"
            ORDER BY "postCount" DESC, "totalViews" DESC, "totalLikes" DESC, "totalComments" DESC
            LIMIT ${limit}
        `) as Array<{
            stockId: number;
            stockName: string;
            postCount: bigint;
            totalViews: bigint;
            totalLikes: bigint;
            totalComments: bigint;
        }>;

        // BigInt를 number로 변환합니다
        return result.map(item => ({
            stockId: item.stockId,
            stockName: item.stockName,
            postCount: Number(item.postCount),
            totalViews: Number(item.totalViews),
            totalLikes: Number(item.totalLikes),
            totalComments: Number(item.totalComments),
        }));
    }
}
