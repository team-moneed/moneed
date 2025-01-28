import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SnackBar from '../../components/SnackBar';

const EditPost = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            content: "",
        }
    });

    const { state } = useLocation();
    const { stocktype } = useParams();
    const [conetentsnackbarVisible, setconetentSnackbarVisible] = useState(false);
    const [titlesnackbarVisible, settitleSnackbarVisible] = useState(false);
    const [editPostsuccessSnackbarVisible, seteditPostSuccessSnackbarVisible] = useState(false);

    const content = watch("content", "");
    const initialContent = state?.content || "";

    const title = watch("title", "");
    const initialTitle = state?.title || "";

    useEffect(() => {
        if (title.trim().length >= 50) {
            settitleSnackbarVisible(true);
        }

        if (content.trim().length >= 1000) {
            seteditPostSuccessSnackbarVisible(true);
        }
    }, [content, title, initialContent, initialTitle]);

    useEffect(() => {
        if (state) {
            setValue('title', state.title);
            setValue('content', state.content);
        }
    }, [state, setValue]);

    const onSubmit = (data) => {
        const formData = { ...data, stocktype };
        console.log('게시글수정')
        seteditPostSuccessSnackbarVisible(true);
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
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
                    )}
                    <textarea
                        {...register("content", { required: "의견을 입력해주세요." })}
                        type="text"
                        placeholder="의견을 입력해주세요"
                        className="w-full h-[30rem] py-[1.6rem] text-[1.6rem] font-[400] leading-[140%] placeholder:text-[var(--moneed-gray-7)] focus:outline-none"
                        maxLength={1000}
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>
                    )}
                    <div className="flex items-center justify-between mt-[1.6rem] fixed bottom-0 left-0 right-0 z-[20] h-[5.2rem] px-8 bg-white">
                        <button
                            className="rounded-full overflow-hidden aspect-[1/1] w-[3.6rem] cursor-pointer"
                            type="submit"
                        >
                            <img
                                src="/src/assets/icon/icon-gallery.svg"
                                alt="gallery"
                                className="w-full h-full object-cover p-[.6rem]"
                            />
                        </button>
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
                {titlesnackbarVisible && (
                    <SnackBar
                        message="제목은 공백 포함 50자 제한입니다."
                        setsnackbar={settitleSnackbarVisible}
                        position="bottom"
                        type="normal"
                    />
                )}
                {conetentsnackbarVisible && (
                    <SnackBar
                        message="본문은 최대 1000자 입니다."
                        setsnackbar={setconetentSnackbarVisible}
                        position="bottom"
                        type="normal"
                    />
                )}
                {editPostsuccessSnackbarVisible && (
                    <SnackBar
                        message="게시글이 수정되었습니다."
                        setsnackbar={seteditPostSuccessSnackbarVisible}
                        position="bottom"
                        type="action"
                    />
                )}
            </div >
        </>
    );
};

export default EditPost;
