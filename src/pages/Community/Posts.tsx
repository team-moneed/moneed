import Post from "./Post";

const Posts = ({ posts }) => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[.6rem] gap-x-[1.2rem] mt-4 md:gap-y-[1.6rem] mb-[.6rem]">
            {posts.map((post) => (
                <Post
                    key={post.postId}
                    userName={post.userName}
                    content={post.content}
                    isliked={post.isliked}
                    comments={post.comments}
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