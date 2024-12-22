import { useForm } from 'react-hook-form';
import Button from "../../components/Button";

const WritePost = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log("게시글 작성 완료", data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>제목</label>
                <input
                    {...register("title", { required: "제목을 입력해주세요." })}
                    type="text"
                    placeholder="제목을 입력하세요"
                />
                <label>내용</label>
                <input
                    {...register("content", { required: "내용을 입력해주세요." })}
                    type="text"
                    placeholder="내용을 적어보세요."
                />
                <Button type="submit">제출</Button>
            </form>
        </>
    );
};

export default WritePost;
