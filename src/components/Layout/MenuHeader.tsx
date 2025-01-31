import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";

const MenuHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { stocktype } = useParams();
    const isWritePostPath = location.pathname.startsWith("/writepost");
    const isEditPostPath = location.pathname.startsWith("/editpost");
    const iscommentPath = location.pathname.startsWith("/comment");
    const [showModal, setShowModal] = useState(false);


    // 뒤로가기 버튼 클릭 시 동작
    const handleBackButtonClick = () => {
        // if ((isWritePostPath || isEditPostPath || iscommentPath)) {
        //     setShowModal(true);
        // } else {
        navigate(-1);  // 뒤로가기
        // }
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        navigate(-1);  // 모달에서 나가기를 클릭 시 뒤로가기
    };

    const handleModalCancel = () => {
        setShowModal(false);  // 모달에서 이어서 하기 클릭 시 모달 닫기
    };

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
        <div className="sticky top-0 z-[10] bg-white flex items-center justify-between shrink-0 self-stretch px-[1.8rem] pb-[1.2rem] pt-[2rem]">
            <img
                className="cursor-pointer w-[2.4rem] h-[2.4rem]"
                onClick={handleBackButtonClick}
                src="/src/assets/icon/icon-arrow-back.svg"
                alt=""
            />
            <h1 className="text-[1.6rem] font-[600] text-[var(--moneed-gray-9)]">{getHeaderTitle()}</h1>
            {(isWritePostPath || isEditPostPath) ? (
                <img
                    className="w-[2.4rem] h-[2.4rem] cursor-pointer"
                    onClick={() => navigate("/")}
                    src="/src/assets/icon/icon-exit.svg"
                    alt=""
                />
            ) : (
                <img className="w-[2.4rem] h-[2.4rem]" src="/src/assets/icon/icon-alarm.svg" alt="" />
            )}
            {showModal && (
                <Modal
                    leftButtontext="이어서 하기"
                    rightButtontext="나가기"
                    leftButtonevent={handleModalCancel}
                    rightButtonevent={handleModalConfirm}
                    onClose={handleModalCancel}
                >
                    {isEditPostPath ?
                        <span>수정하던 글은 저장되지않아요.<br />
                            다음에 수정할까요?
                        </span> :
                        <span>작성하던 글은 저장되지않아요.<br />
                            다음에 작성할까요?
                        </span>}
                </Modal>
            )}
        </div>
    );
};

export default MenuHeader;
