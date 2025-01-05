import { useLocation, useNavigate, useParams } from "react-router-dom";

const MenuHeader = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { stocktype } = useParams();
    const isWritePostPath = location.pathname.startsWith("/writepost");
    const isEditPostPath = location.pathname.startsWith("/editpost");
    const iscommentPath = location.pathname.startsWith("/comment");


    const getHeaderTitle = () => {

        if (isWritePostPath) {
            return "게시판 글쓰기";
        }

        if (isEditPostPath) {
            return "게시글 수정";
        }


        if (iscommentPath && stocktype) {
            return `${decodeURIComponent(stocktype)} 커뮤니티`;
        }

        switch (location.pathname) {
            case "/searchstocktype":
                return "게시판 선택";
            case "/community":
                return "커뮤니티";
            case "/mypost":
                return "내가 작성한 게시글";
            case "/mycomment":
                return "내가 작성한 댓글";
            default:
                return "moneed";
        }
    };

    return (
        <div className="flex items-center justify-between shrink-0 self-stretch px-[1.8rem] pb-[1.2rem] pt-[2rem] sticky top-0 z-[10] bg-white">
            <img className="cursor-pointer w-[2.4rem] h-[2.4rem]"
                onClick={() => navigate(-1)}
                src="/src/assets/icon/icon-arrow-back.svg" alt="" />
            <h1 className="text-[1.6rem] font-[600] text-[var(--moneed-gray-9)]">{getHeaderTitle()}</h1>
            {(isWritePostPath || isEditPostPath) ? <img className="w-[2.4rem] h-[2.4rem] cursor-pointer" onClick={() => navigate("/")} src="/src/assets/icon/icon-exit.svg" alt="" /> :
                <img className="w-[2.4rem] h-[2.4rem]" src="/src/assets/icon/icon-alarm.svg" alt="" />
            }
        </div>
    );
};

export default MenuHeader;