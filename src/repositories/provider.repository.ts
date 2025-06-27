import { OAuthAccount } from '@/generated/prisma';
import prisma from '@/lib/prisma';

export class ProviderRepository {
    private prisma = prisma;

    async findProviderInfo(
        userId: string,
        provider: string,
    ): Promise<Pick<OAuthAccount, 'providerUserId' | 'accessToken'> | null> {
        return this.prisma.oAuthAccount.findFirst({
            where: {
                userId,
                provider,
            },
            select: {
                providerUserId: true,
                accessToken: true,
            },
        });
    }

    async upsert(
        userId: string,
        providerData: Pick<
            OAuthAccount,
            | 'provider'
            | 'providerUserId'
            | 'accessToken'
            | 'refreshToken'
            | 'accessTokenExpiresIn'
            | 'refreshTokenExpiresIn'
        >,
    ) {
        const { provider, providerUserId, accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn } =
            providerData;

        return this.prisma.oAuthAccount.upsert({
            where: {
                provider_providerUserId: {
                    provider,
                    providerUserId,
                },
            },
            update: {
                accessToken,
                refreshToken,
                accessTokenExpiresIn,
                refreshTokenExpiresIn,
            },
            create: {
                provider,
                providerUserId,
                accessToken,
                refreshToken,
                accessTokenExpiresIn,
                refreshTokenExpiresIn,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async create(
        providerData: Pick<
            OAuthAccount,
            | 'provider'
            | 'providerUserId'
            | 'accessToken'
            | 'refreshToken'
            | 'accessTokenExpiresIn'
            | 'refreshTokenExpiresIn'
        >,
        userId: string,
    ) {
        return this.prisma.oAuthAccount.create({
            data: {
                ...providerData,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
}
