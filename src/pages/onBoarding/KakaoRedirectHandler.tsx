import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchKakaoToken } from '@/api/auth/authApi';

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const handleError = (message: string) => {
        alert(message);
        navigate('/onboarding');
    };

    const handleSuccess = (token: string) => {
        localStorage.setItem('access_token', token);
        navigate('/');
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['access-token', code],
        queryFn: () => fetchKakaoToken(code!),
        enabled: !!code,
        retry: false,
    });

    if (!code) {
        navigate('/onboarding');
        return null;
    }

    if (isLoading) {
        return <div>로그인 처리 중...</div>;
    }

    if (error) {
        console.error('Token request failed:', error);
        handleError('로그인에 실패했습니다. 네트워크 상태를 확인해주세요.');
        return null;
    }

    if (!data?.access_token) {
        localStorage.removeItem('access_token');
        handleError('로그인 실패: 토큰이 없습니다.');
        return null;
    }

    handleSuccess(data.access_token);
    return null;
};

export default KakaoRedirectHandler;
