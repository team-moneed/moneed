import Post from "./Post";

const Posts = ({ posts, imgFirst, displayMode, isImgShow }) => {

    const ALIGNOPTIONS = {
        slidesToScroll: 1,
        loop: true,
        align: "start",
        draggable: true,
        containScroll: "trimSnaps",
    };

    const postElements = posts.map((post) => (
        <Post
            key={post.postId}
            userName={post.userName}
            content={post.content}
            isliked={post.isliked}
            comments={post.comments}
            likes={post.likes}
            postId={post.postId}
            postImages={post.postImages}
            imgFirst={imgFirst}
            displayMode={displayMode}
            isImgShow={isImgShow}
        />
    ));

    const slides = posts.map((post) => ({
        imgUrl: post.postImages[0],
        title: post.title,
        content: post.content,
        userName: post.userName
    }));

    return (
        <div className="mt-4">
            {displayMode === "slider" && postElements.length > 0 && (
                <div className="mb-8">

                </div>
            )}

            {displayMode === "list" && postElements.length > 0 && (
                <div>{postElements}</div>
            )}
        </div>
    );
};

export default Posts;