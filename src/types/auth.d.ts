import { JWTPayload } from 'jose';
import { UserInfo } from './user';

type TokenPayload = UserInfo & JWTPayload;

type DecodedToken = UserInfo & {
    exp: number;
    iat: number;
    expiresAt: Date;
};
