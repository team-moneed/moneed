import Post from "./Post";

type PostType = {
    userName: string;
    content: string;
    isliked: boolean
    postId: number;
    stocktype: string;
    comments: string[];
    postImages: string[];
    likes: number;
    createdAt: string;
    title: string;
}

type PostsProps = {
    posts: PostType[];
};

const Posts = ({ posts }: PostsProps) => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[.6rem] gap-x-[1.2rem] mt-4 md:gap-y-[1.6rem] mb-[.6rem]">
            {posts.map((post: PostType) => (
                <Post
                    key={post.postId}
                    userName={post.userName}
                    content={post.content}
                    isliked={post.isliked}
                    comments={post.comments}
                    stocktype={post.stocktype}
                    likes={post.likes}
                    postId={post.postId}
                    createdAt={post.createdAt}
                    title={post.title}
                    postImages={post.postImages}
                />
            ))}
        </div>
    );
};

export default Posts;