import { OAuthAccount, User } from '@/generated/prisma';
import { Optional } from '@/types/util';
import prisma from '@/lib/prisma';

export class UserRepository {
    private prisma = prisma;

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async findByProvider(providerData: Pick<OAuthAccount, 'provider' | 'providerUserId'>): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                oauthAccounts: {
                    some: providerData,
                },
            },
        });
    }

    async findByUserInfo(userInfo: {
        name: string;
        email: string;
        birthyear: string;
        birthday: string;
    }): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                name: userInfo.name,
                email: userInfo.email,
                birthyear: userInfo.birthyear,
                birthday: userInfo.birthday,
            },
        });
    }

    async updateByProvider(
        providerData: Pick<OAuthAccount, 'provider' | 'providerUserId' | 'accessToken' | 'refreshToken'>,
    ): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                oauthAccounts: {
                    some: {
                        provider: providerData.provider,
                        providerUserId: providerData.providerUserId,
                    },
                },
            },
        });

        if (!user) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }

        return user;
    }

    async create(
        providerData: Pick<OAuthAccount, 'provider' | 'providerUserId' | 'accessToken' | 'refreshToken'> | null,
        userData: Optional<User, 'id' | 'createdAt' | 'updatedAt' | 'role'>,
    ): Promise<User> {
        if (providerData) {
            return this.prisma.user.create({
                data: {
                    ...userData,
                    oauthAccounts: {
                        create: providerData,
                    },
                },
            });
        }

        return this.prisma.user.create({
            data: userData,
        });
    }
}
