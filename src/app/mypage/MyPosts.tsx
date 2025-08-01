import MypageBox from '@/components/Mypage/MypageBox';
import MyPageBoxSkeleton from '@/components/Skeletons/mypage/MyPageBoxSkeleton';
import { useMyPosts } from '@/queries/posts.query';
import { Suspense } from 'react';

function MyPosts() {
    const { data: posts } = useMyPosts();

    return <MypageBox menu='내가 작성한 게시글' count={posts.length} href={'/mypost'}></MypageBox>;
}

function MyPostsWithSuspense() {
    return (
        <Suspense fallback={<MyPageBoxSkeleton />}>
            <MyPosts />
        </Suspense>
    );
}

export default MyPostsWithSuspense;
