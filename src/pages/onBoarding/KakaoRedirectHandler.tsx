import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchKakaoToken } from '../../api/auth/authApi';

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');

        if (!code) {
            navigate('/onboarding');
            return;
        }

        const getToken = async () => {
            try {
                const data = await fetchKakaoToken(code);

                if (data?.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    navigate('/');
                } else {
                    throw new Error('No access token received');
                }
            } catch (error) {
                console.error('Token request failed:', error);
                alert('로그인에 실패했습니다.');
                navigate('/onboarding');
            }
        };

        getToken();
    }, [navigate]);

    return <div>로그인 처리 중...</div>;
};

export default KakaoRedirectHandler;
