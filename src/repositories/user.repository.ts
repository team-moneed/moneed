import { OAuthAccount, User } from '@/generated/prisma';
import { Optional } from '@/types/util';
import prisma from '@/lib/prisma';
import { ProviderRepository } from './provider.repository';

export class UserRepository {
    private prisma = prisma;
    private providerRepository: ProviderRepository;

    constructor() {
        this.providerRepository = new ProviderRepository();
    }

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

    async updateLastLoginAt(userId: string) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { lastLoginAt: new Date() },
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

        // OAuth 계정 정보 업데이트
        await this.prisma.oAuthAccount.update({
            where: {
                provider_providerUserId: {
                    provider: providerData.provider,
                    providerUserId: providerData.providerUserId,
                },
            },
            data: {
                accessToken: providerData.accessToken,
                refreshToken: providerData.refreshToken,
            },
        });

        // 마지막 로그인 시간 업데이트
        return this.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
    }

    async isExistingUserByProvider(
        providerData: Pick<OAuthAccount, 'provider' | 'providerUserId'>,
    ): Promise<{ user: User | null; isExisting: boolean }> {
        const existingUser = await this.findByProvider({
            provider: providerData.provider,
            providerUserId: providerData.providerUserId,
        });

        return { user: existingUser, isExisting: !!existingUser };
    }

    async isExistingUserByUserInfo(userInfo: {
        name: string;
        email: string;
        birthyear: string;
        birthday: string;
    }): Promise<{ user: User | null; isExisting: boolean }> {
        const existingUser = await this.findByUserInfo(userInfo);
        return { user: existingUser, isExisting: !!existingUser };
    }

    async upsertWithKakao(
        providerData: Pick<
            OAuthAccount,
            | 'provider'
            | 'providerUserId'
            | 'accessToken'
            | 'refreshToken'
            | 'accessTokenExpiresIn'
            | 'refreshTokenExpiresIn'
        >,
        userData: Optional<User, 'id' | 'createdAt' | 'updatedAt' | 'role' | 'lastLoginAt'>,
    ): Promise<{ user: User; isExistingUser: boolean }> {
        // 먼저 기존 사용자 확인 (provider ID 또는 사용자 정보로)
        const existingUserByProvider = await this.isExistingUserByProvider(providerData);

        if (existingUserByProvider.isExisting) {
            await this.updateLastLoginAt(existingUserByProvider.user!.id);
            await this.providerRepository.updateToken(providerData);
            return { user: existingUserByProvider.user!, isExistingUser: true };
        }

        const existingUserByUserInfo = await this.isExistingUserByUserInfo(userData);

        if (existingUserByUserInfo.isExisting) {
            await this.updateLastLoginAt(existingUserByUserInfo.user!.id);
            this.providerRepository.create(providerData, existingUserByUserInfo.user!.id);
            return { user: existingUserByUserInfo.user!, isExistingUser: true };
        }

        if (!existingUserByProvider.isExisting && !existingUserByUserInfo.isExisting) {
            const newUser = await this.prisma.user.create({
                data: {
                    ...userData,
                    lastLoginAt: new Date(),
                    oauthAccounts: {
                        create: providerData,
                    },
                },
            });

            return { user: newUser, isExistingUser: false };
        }

        throw new Error('사용자를 찾을 수 없습니다.');
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
        > | null,
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
