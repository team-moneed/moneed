import MypageBox from "../../components/MypageBox";
import { useNavigate, Outlet } from "react-router-dom";

const Mypage = () => {

    let navigate = useNavigate();
    const movetoMyProfile = () => {
        navigate(`/myprofile`);
    }

    const movetoMyPost = () => {
        navigate(`/mypost`);
    }

    return (
        <>
            <MypageBox
                className=""
                menu="내 프로필"
                onClick={movetoMyProfile}

            ></MypageBox>
            <MypageBox
                className=""
                menu="내가 쓴글"
                onClick={movetoMyPost}

            ></MypageBox>
        </>
    );
};

export default Mypage;