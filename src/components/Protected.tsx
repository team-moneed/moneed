import useAuthStore from '@/store/useAuthStore';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }: PropsWithChildren) => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    if (!isLoggedIn) {
        alert('로그인이 필요합니다.');
        return <Navigate to='/onboarding' />;
    }
    return children;
};

export default Protected;
