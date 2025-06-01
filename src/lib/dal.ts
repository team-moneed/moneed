import 'server-only';

import { decrypt } from './session';
import { TokenPayload } from '@/types/auth';
import { cache } from 'react';
import { redirect } from 'next/navigation';

export const verifySession = cache(async (token: string) => {
    if (!token) {
        redirect('/onboarding');
    }

    const payload = await decrypt<TokenPayload>(token);

    if (!payload) {
        redirect('/onboarding');
    }

    return payload;
});
