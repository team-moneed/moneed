import useAuth from '@/hook/useAuth';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }: PropsWithChildren) => {
    const { isLoggedIn } = useAuth();
    return <div>{isLoggedIn ? children : <Navigate to='/onboarding' />}</div>;
};

export default Protected;
