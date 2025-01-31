import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import { useModal } from "../../context/ModalContext";
import useSnackBarStore from "../../store/useSnackBarStore";

type CommentType = {
    userName: string;
    content: string;
    createdAt: string;
    onEditComment: string;
}

const Comment = ({ userName, content, createdAt, onEditComment }: CommentType) => {

    const [isDropdownOpen, setIsdropdownOpen] = useState(false)

    const { showSnackBar } = useSnackBarStore();
    const { confirm } = useModal();

    //댓글 수정/삭제 드롭다운 
    const handleOpendropdown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsdropdownOpen((prev) => !prev)
    }

    //댓글 삭제할건지 묻는 모달 
    const opencommentDeletemodal = () => {
        const result = confirm(<span>
            삭제된 내용은 복구되지 않아요.<br />
            정말 삭제하실건가요?
        </span>);
        result.then((confirmed) => {
            if (confirmed) {
                handledeleteComment();
            }
        });
        setIsdropdownOpen((prev) => !prev)
    }

    //댓글 삭제 api 연동
    const handledeleteComment = () => {
        showSnackBar('댓글이 삭제되었습니다.', 'action', 'bottom', '');
    }

    const closeDropdown = () => {
        setIsdropdownOpen(false);
    };


    return (
        <>
            <div className="relative flex items-start gap-[.6rem] w-full">
                <i className="absolute block w-[.1rem] top-0 bottom-0 left-[1.6rem] bg-[var(--moneed-gray-5)]"></i>
                <div className="relative rounded-full overflow-hidden aspect-[1/1] w-[3.2rem] shrink-0">
                    <img src="/src/assets/temp/sample3.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <span className="text-[1.4rem] font-[700] leading-[140%] text-[var(--moneed-black)]">
                        {userName}
                    </span>
                    <i className="w-[.2rem] h-[.2rem] mx-[.8rem] mb-[.2rem] rounded-full bg-[var(--moneed-gray-5)] inline-block "></i>
                    <span className="text-[1.4rem] font-[400] leading-[142%] text-[var(--moneed-gray-7)]">
                        {createdAt}
                    </span>
                    <div className="text-[1.4rem] font-[400] leading-[140%]">
                        {content}
                    </div>
                </div>
                <div className="relative">
                    <div className="relative cursor-pointer rounded-full overflow-hidden aspect-[1/1] w-[2.4rem] shrink-0 ml-auto" onClick={handleOpendropdown}>
                        <img src="/src/assets/icon/icon-more.svg" alt="" className="w-full h-full object-cover" />
                    </div>
                    {isDropdownOpen && <Dropdown
                        firsttext="댓글 수정"
                        secondtext="댓글 삭제"
                        secondevent={opencommentDeletemodal}
                        firstevent={onEditComment}
                        onClose={closeDropdown}
                    ></Dropdown>}
                </div>
            </div>
        </>
    );
};

export default Comment;