import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useLocation } from "react-router-dom";
import UploadImage from '../../components/UploadImage';
import { useKeyboardOffset } from '../../hook/useKeyboardOffset';
import useSnackBarStore from '../../store/useSnackBarStore';



type FieldData = {
    title: string;
    content: string;
}


const EditPost = () => {
    const { register, handleSubmit, watch, setValue } = useForm<FieldData>({
        defaultValues: {
            title: "",
            content: "",
        }
    });

    const { state } = useLocation();
    const { stocktype } = useParams();

    const { showSnackBar } = useSnackBarStore();
    const bottomOffset = useKeyboardOffset();

    const content = watch("content", "");
    const initialContent = state?.content || "";

    const title = watch("title", "");
    const initialTitle = state?.title || "";

    const [postImages, _] = useState<string[]>([]);
    const [, setFormImg] = useState<FormData | string[]>([]);

    useEffect(() => {
        if (title.trim().length >= 50) {
            showSnackBar('제목은 공백 포함 50자 제한입니다.', 'normal', 'bottom', '/src/assets/icon/icon-snackbar.svg');
        }

        if (content.trim().length >= 1000) {
            showSnackBar('본문은 최대 1000자 입니다.', 'normal', 'bottom', '/src/assets/icon/icon-snackbar.svg');
        }
    }, [content, title, initialContent, initialTitle]);

    useEffect(() => {
        if (state) {
            setValue('title', state.title);
            setValue('content', state.content);
        }
    }, [state, setValue]);

    const handleFileUpload = (formData: FormData) => {
        setFormImg(formData);
    };

    const onSubmit = (data: FieldData) => {
        const formData = { ...data, stocktype };

        if (!title.trim()) {
            showSnackBar('제목을 입력해주세요.', 'normal', 'bottom', '/src/assets/icon/icon-snackbar.svg');
            return;
        }

        if (content.trim().length == 0) {
            showSnackBar('내용을 입력해주세요.', 'normal', 'bottom', '/src/assets/icon/icon-snackbar.svg');
            return;
        }

        console.log('게시글수정', formData)
        showSnackBar('게시글이 수정되었습니다.', 'action', 'bottom', '');
    };



    return (
        <>
            <div className="px-[2rem] max-w-[128rem] mx-auto">
                <div className="flex items-center justify-between gap-[.6rem] mt-[1rem]">
                    <button
                        className="bg-[var(--moneed-shade-bg)] py-[1.2rem] px-[1.6rem] rounded-[.8rem] flex items-center gap-[0.6rem]"
                    >
                        <span className={`text-[1.4rem] font-[400] ${stocktype ? 'text-[var(--moneed-black)]' : 'text-[var(--moneed-gray-7)]'}`}>
                            {stocktype || "글을 쓸 커뮤니티 종목을 선택해주세요."}
                        </span>
                        <div className="overflow-hidden aspect-[1/1] w-[1.2rem]">
                            <img src="/src/assets/icon/icon-arrow-down.svg" alt="" className="w-full h-full object-cover" />
                        </div>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("title", { required: "제목을 입력해주세요." })}
                        type="text"
                        placeholder="제목을 입력해주세요"
                        className="border-b border-[var(--moneed-gray-5)] w-full py-[1.6rem] text-[1.6rem] font-[400] leading-[140%] focus:outline-none placeholder:text-[var(--moneed-gray-7)]"
                        maxLength={50}
                    />
                    <textarea
                        {...register("content", { required: "의견을 입력해주세요." })}
                        // type="text"
                        placeholder="의견을 입력해주세요"
                        className="w-full h-[30rem] py-[1.6rem] text-[1.6rem] font-[400] leading-[140%] placeholder:text-[var(--moneed-gray-7)] focus:outline-none"
                        maxLength={1000}
                    />
                    <div
                        className={`fixed left-0 right-0 z-[20] h-[5.2rem] px-8 bg-white flex items-center justify-between transition-all duration-300 ${bottomOffset > 0 ? `bottom-[${bottomOffset}px]` : "bottom-0"
                            }`}
                    >
                        <UploadImage
                            id="blog"
                            onUploadFiles={handleFileUpload}
                            multiple={true}
                            uploadfileLength={4}
                            imgpreviewWidth={60}
                            imgpreviewHeight={60}
                            imgClassName="object-cover w-full h-full"
                            buttonpositionClassName="mr-0"
                            imgUrl={postImages}
                        // buttonProps={{ type: "button" }}
                        />
                        <div className="text-right text-[1.4rem] text-[var(--moneed-gray-7)] w-full mx-[1rem]">
                            {content.length} / 1000자
                        </div>
                        <button
                            className="rounded-full overflow-hidden aspect-[1/1] w-[3.6rem] bg-[var(--moneed-gray-6)] cursor-pointer hover:bg-[var(--moneed-brand-color)]"
                            type="submit"
                        >
                            <img
                                src="/src/assets/icon/icon-submit-post.svg"
                                alt="submit"
                                className="w-full h-full object-cover p-[.6rem]"
                            />
                        </button>
                    </div>
                </form>
            </div >
        </>
    );
};

export default EditPost;
