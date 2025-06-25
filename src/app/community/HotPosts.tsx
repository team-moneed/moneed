// import { type Post } from '@/types/post';
// import { useQuery } from '@tanstack/react-query';
// import Posts from '@/components/Community/Posts';

const HotPosts = ({ id }: { id: string }) => {
    const title = '인기 급상승 게시글';
    // const { data: posts } = useQuery<Post[]>({
    //     queryKey: ['posts'],
    //     queryFn: () => fetch('/api/posts').then(res => res.json()),
    // });

    return (
        <section id={id} className='mt-[2.8rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-[1.8rem]'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                    {title}
                </h2>
            </div>
            {/* {posts && <Posts posts={posts} />} */}
        </section>
    );
};

export default HotPosts;
