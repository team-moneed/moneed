import MypageBox from '@/components/Mypage/MypageBox';
import MyPageBoxSkeleton from '@/components/Skeletons/mypage/MyPageBoxSkeleton';
import { useMyComments } from '@/queries/comments.query';
import { Suspense } from 'react';

function MyComments() {
    const { data: comments } = useMyComments();
    return <MypageBox menu='내가 작성한 댓글' count={comments.length} href={'/mycomment'}></MypageBox>;
}

function MyCommentsWithSuspense() {
    return (
        <Suspense fallback={<MyPageBoxSkeleton />}>
            <MyComments />
        </Suspense>
    );
}

export default MyCommentsWithSuspense;
