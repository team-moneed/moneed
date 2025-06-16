import { User } from '@/generated/prisma';
import { Optional } from '@/types/util';

export type OptionalUser = Optional<User, 'id' | 'createdAt' | 'updatedAt' | 'role'>;

export type UserInfo = {
    id: string;
    nickname: string;
    profileImage: string;
};
