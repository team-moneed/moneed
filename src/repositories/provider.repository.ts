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

    async delete(provider: string, providerUserId: string) {
        return this.prisma.oAuthAccount.delete({
            where: {
                provider_providerUserId: {
                    provider,
                    providerUserId,
                },
            },
        });
    }

    async updateToken(
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

        return this.prisma.oAuthAccount.update({
            where: {
                provider_providerUserId: {
                    provider,
                    providerUserId,
                },
            },
            data: {
                accessToken,
                refreshToken,
                accessTokenExpiresIn,
                refreshTokenExpiresIn,
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

    async getTokenExpiration(provider: string, accessToken: string) {
        return this.prisma.oAuthAccount.findFirst({
            where: {
                provider,
                accessToken,
            },
            select: {
                accessToken: true,
                refreshToken: true,
                accessTokenExpiresIn: true,
                refreshTokenExpiresIn: true,
                providerUserId: true,
            },
        });
    }
}
