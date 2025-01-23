import { http } from "../request";

export const kakaoAuth = async (data: {}) => {
	const response = await http.post(`/api/accounts/kakao/login`, data, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
};
