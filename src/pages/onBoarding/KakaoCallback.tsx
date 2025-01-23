import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoAuth } from "../../api/auth/authApi";
import useAuthStore from "../../store/useAuthStore";

const KakaoCallback = () => {
	const navigate = useNavigate();
	const setUserId = useAuthStore((state) => state.setUserId);
	const setLoginState = useAuthStore((state) => state.setLoginState);

	useEffect(() => {
		// URL에서 인증 코드 추출
		const code = new URL(window.location.href).searchParams.get("code");

		if (code) {
			// 백엔드로 인증 코드 전송
			const kakaoLogin = async () => {
				try {
					const response = await kakaoAuth({
						authorizationCode: code,
					});
					if (response.status === 200) {
						// 토큰 저장
						localStorage.setItem(
							"auth_token",
							response.data.success.responseData.accessToken,
						);
						localStorage.setItem(
							"auth_refresh_token",
							response.data.success.responseData.refreshToken,
						);
						setUserId(response.data.success.responseData.userId);
						setLoginState(true);
						// 메인 페이지로 이동
						navigate("/");
					} else if (response.status === 201) {
						navigate("/join", {
							state: { ...response.data.success.responseData },
						});
						console.log("need to sign in", response.data.success.responseData);
					}
				} catch (error) {
					console.error("카카오 로그인 처리 실패:", error);
				}
			};

			kakaoLogin();
		}
	}, [navigate, setUserId, setLoginState]);

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div>로그인 처리중...</div>
		</div>
	);
};

export default KakaoCallback;
