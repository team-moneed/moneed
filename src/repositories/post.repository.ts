import prisma from '@/lib/prisma';
import { BoardRankResponse } from '@/types/board';

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
                likes: true,
                likePosts: userId
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
                COALESCE(SUM(p.views), 0) as "totalViews",
                COALESCE(SUM(p.likes), 0) as "totalLikes",
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
