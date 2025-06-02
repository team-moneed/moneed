import 'server-only';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { TOKEN_EXPIRATION } from '@/constants/token';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt<T extends JWTPayload>(payload: T, exp: Date) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(encodedKey);
}

export async function decrypt<T extends JWTPayload>(jwt: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(jwt, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload as T;
    } catch (error) {
        throw error;
    }
}

export async function createToken<T extends JWTPayload>(payload: T) {
    const accessToken = await encrypt<T>(payload, new Date(Date.now() + TOKEN_EXPIRATION.ACCESS_TOKEN));
    const refreshToken = await encrypt<T>(payload, new Date(Date.now() + TOKEN_EXPIRATION.REFRESH_TOKEN));
    return { accessToken, refreshToken };
}

export async function updateRefreshToken() {
    const refreshToken = (await cookies()).get('refresh_token')?.value;
    const payload = await decrypt(refreshToken);

    if (!refreshToken || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + TOKEN_EXPIRATION.REFRESH_TOKEN);

    const cookieStore = await cookies();
    cookieStore.set('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteRefreshToken() {
    const cookieStore = await cookies();
    cookieStore.delete('refresh_token');
}
