import { accessTokenCookie } from '@/lib/session';
import { TokenPayload } from '@/types/auth';
import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';

export default async function RandomNickname() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(accessTokenCookie.name)?.value;
    if (!accessToken) {
        return <span>RandomNickname</span>;
    }

    const decoded = decodeJwt<TokenPayload>(accessToken);

    return <span>[{decoded.nickname}]</span>;
}
