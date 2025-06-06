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

    async delete(providerUserId: string, provider: string) {
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
        providerData: Pick<OAuthAccount, 'provider' | 'providerUserId' | 'accessToken' | 'refreshToken'>,
    ) {
        const { provider, providerUserId, accessToken, refreshToken } = providerData;

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
            },
        });
    }

    async create(
        providerData: Pick<OAuthAccount, 'provider' | 'providerUserId' | 'accessToken' | 'refreshToken'>,
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
