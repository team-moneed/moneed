import Post from "./Post";

const Posts = ({ posts }) => {

    return (
        <div className="">
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