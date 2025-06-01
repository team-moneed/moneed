import { UserRepository } from '@/repositories/user.repository';
import { OAuthAccount, User } from '@/generated/prisma';
import { createToken, decrypt } from '@/lib/session';
import { TokenPayload } from '@/types/auth';
import { TOKEN_ERROR } from '@/constants/token';

export interface KakaoUserInfo {
    id: bigint;
    connected_at: string;
    synched_at: string;
    properties: {
        nickname: string;
        profile_image: string;
        thumbnail_image: string;
    };
    kakao_account: {
        profile: {
            nickname: string;
            thumbnail_image_url: string;
            profile_image_url: string;
        };
        age_range: string;
        gender: 'male' | 'female';
        name: string;
        email: string;
        birthyear: string;
        birthday: string;
    };
}

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async checkExistingUser(userInfo: KakaoUserInfo): Promise<{
        isExistingUser: boolean;
        matchType: 'provider' | 'userInfo' | 'none';
        user: User | null;
    }> {
        // 1. 카카오 ID로 기존 회원 확인
        const userByProvider = await this.userRepository.findByProvider({
            provider: 'kakao',
            providerUserId: userInfo.id.toString(),
        });
        if (userByProvider) {
            return {
                isExistingUser: true,
                matchType: 'provider',
                user: userByProvider,
            };
        }

        // 2. 사용자 정보로 기존 회원 확인
        const userByInfo = await this.userRepository.findByUserInfo({
            name: userInfo.kakao_account.name,
            email: userInfo.kakao_account.email,
            birthyear: userInfo.kakao_account.birthyear,
            birthday: userInfo.kakao_account.birthday,
        });

        if (userByInfo) {
            return {
                isExistingUser: true,
                matchType: 'userInfo',
                user: userByInfo,
            };
        }

        return {
            isExistingUser: false,
            matchType: 'none',
            user: null,
        };
    }

    // 기존 회원 확인 및 등록
    async handleKakaoAuth(
        kakaoUserInfo: KakaoUserInfo,
        providerData: Pick<OAuthAccount, 'accessToken' | 'refreshToken'>,
    ) {
        const existingUser = await this.checkExistingUser(kakaoUserInfo);

        const provider = {
            provider: 'kakao',
            providerUserId: kakaoUserInfo.id.toString(),
            accessToken: providerData.accessToken,
            refreshToken: providerData.refreshToken,
        };

        if (existingUser.isExistingUser) {
            // 이미 존재하는 회원인 경우 (로그인)
            existingUser.user = await this.userRepository.updateByProvider(provider);
        } else {
            // 존재하지 않는 회원인 경우 (회원가입)
            existingUser.user = await this.userRepository.create(provider, {
                name: kakaoUserInfo.kakao_account.name,
                nickname: kakaoUserInfo.kakao_account.profile.nickname,
                email: kakaoUserInfo.kakao_account.email,
                birthyear: kakaoUserInfo.kakao_account.birthyear,
                birthday: kakaoUserInfo.kakao_account.birthday,
                profileImage: kakaoUserInfo.kakao_account.profile.profile_image_url,
                thumbnailImage: kakaoUserInfo.kakao_account.profile.thumbnail_image_url,
                ageRange: kakaoUserInfo.kakao_account.age_range,
                gender: kakaoUserInfo.kakao_account.gender,
                lastLoginAt: new Date(),
            });
        }

        return existingUser.user;
    }

    async refreshToken(token: string) {
        const payload = await decrypt<TokenPayload>(token);

        if (!payload) {
            throw new Error(TOKEN_ERROR.INVALID_TOKEN);
        }

        const user = await this.userRepository.findById(payload.id);

        if (!user) {
            throw new Error(TOKEN_ERROR.USER_NOT_FOUND);
        }

        const { accessToken, refreshToken } = await createToken<TokenPayload>({
            id: user.id,
            nickname: user.nickname,
            profileImage: user.profileImage,
        });

        return { accessToken, refreshToken };
    }
}
