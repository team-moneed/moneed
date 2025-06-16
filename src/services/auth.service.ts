import { UserRepository } from '@/repositories/user.repository';
import { OAuthAccount } from '@/generated/prisma';
import { deleteSession } from '@/lib/session';
import { logoutKakao } from '@/api/kakao.api';
import { ProviderRepository } from '@/repositories/provider.repository';
import { AxiosError } from 'axios';

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
    private providerRepository: ProviderRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.providerRepository = new ProviderRepository();
    }

    // 기존 회원 확인 및 등록
    async signInOrSignUpWithKakao(
        kakaoUserInfo: KakaoUserInfo,
        providerData: Pick<
            OAuthAccount,
            'accessToken' | 'refreshToken' | 'accessTokenExpiresIn' | 'refreshTokenExpiresIn'
        >,
    ) {
        const provider = {
            provider: 'kakao' as const,
            providerUserId: kakaoUserInfo.id.toString(),
            accessToken: providerData.accessToken,
            refreshToken: providerData.refreshToken,
            accessTokenExpiresIn: providerData.accessTokenExpiresIn,
            refreshTokenExpiresIn: providerData.refreshTokenExpiresIn,
        };

        const userData = {
            name: kakaoUserInfo.kakao_account.name,
            nickname: kakaoUserInfo.kakao_account.profile.nickname,
            email: kakaoUserInfo.kakao_account.email,
            birthyear: kakaoUserInfo.kakao_account.birthyear,
            birthday: kakaoUserInfo.kakao_account.birthday,
            profileImage: kakaoUserInfo.kakao_account.profile.profile_image_url,
            thumbnailImage: kakaoUserInfo.kakao_account.profile.thumbnail_image_url,
            ageRange: kakaoUserInfo.kakao_account.age_range,
            gender: kakaoUserInfo.kakao_account.gender,
        };

        return await this.userRepository.upsertWithKakao(provider, userData);
    }

    async logoutWithKakao(userId: string) {
        try {
            const providerInfo = await this.providerRepository.findProviderInfo(userId, 'kakao');
            if (!providerInfo) {
                await deleteSession();
                return;
            }

            const { accessToken, providerUserId } = providerInfo;
            if (!accessToken) {
                await deleteSession();
                return;
            }

            await logoutKakao({ accessToken, providerUserId });
            await deleteSession();
        } catch (e) {
            const error = e as AxiosError<{ msg: string; code: number }>;
            if (error.response?.data?.code === -401) {
                await deleteSession();
            }
        }
    }
}
