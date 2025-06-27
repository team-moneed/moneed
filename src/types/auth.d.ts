import { JWTPayload } from 'jose';
import { UserInfo } from './user';

type TokenPayload = { userId: string; nickname: string } & JWTPayload;

type DecodedToken = UserInfo & {
    exp: number;
    iat: number;
    expiresAt: Date;
};
