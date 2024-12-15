import Post from "./Post";

const Posts = ({ posts }) => {

    return (
        <>

            {posts.map((post) => (
                <Post
                    userName={post.userName}
                    content={post.content}
                    isliked={post.isliked}
                    comments={post.comments}
                    likes={post.likes}
                    postId={post.postId}
                    postImages={post.postImages}
                >
                </Post>
            ))}
        </>
    );
};

export default Posts;