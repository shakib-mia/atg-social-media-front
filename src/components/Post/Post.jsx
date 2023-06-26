import React, { useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/userContext";

const Post = ({ postBody, postedBy, likedBy, comments, _id }) => {
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  const handleLike = () => {
    const token = localStorage.getItem("token");
    const body = { _id, token, likedBy: [...likedBy] };
    axios
      .put("http://localhost:5000/like", body)
      .then((res) => console.log(res));
  };

  const handleCommentSubmit = (e, username) => {
    e.preventDefault();

    const comment = [
      ...comments,
      { commentedBy: username, comment: e.target.comment.value },
    ];
    console.log(comments);

    const body = {
      _id,
      commentedBy: username,
      comment,
    };
    axios
      .put("http://localhost:5000/comments", body)
      .then((res) => console.log(res));

    e.target.reset();
  };

  return (
    <UserContext.Consumer>
      {({ username }) => (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <p className="capitalize font-medium">
              {postedBy.includes("-")
                ? postedBy.split("-").join(" ")
                : postedBy}
            </p>

            <div className="text-3xl cursor-pointer select-none">...</div>
          </div>
          <p>{postBody}</p>

          <div className="flex justify-between">
            <p className="cursor-pointer" onClick={() => setShowLikes(true)}>
              {likedBy.length}
            </p>
            <p
              onClick={() => setShowComments(!showComments)}
              className="cursor-pointer"
            >
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </p>
          </div>

          <div className="flex">
            <button
              className="w-1/2 p-3 hover:bg-slate-200 disabled:bg-slate-200 cursor-pointer border rounded-l-md disabled:cursor-not-allowed"
              onClick={handleLike}
              disabled={likedBy.includes(username)}
            >
              {likedBy.includes(username) ? "Liked" : "Like"}
            </button>
            <button
              className="w-1/2 p-3 hover:bg-slate-200 cursor-pointer border border-l-0 rounded-r-md"
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
              Comment
            </button>
          </div>

          {showComments && (
            <>
              {comments.map(({ commentedBy, comment }, id) => (
                <div key={id} className=" mt-3">
                  <h5 className="text-lg font-bold capitalize">
                    {commentedBy}
                  </h5>
                  <p>{comment}</p>
                </div>
              ))}

              <form
                className="relative mt-3"
                onSubmit={(e) => handleCommentSubmit(e, username)}
              >
                <textarea
                  name="comment"
                  id=""
                  placeholder="Put Your Comment Here"
                  className="w-full px-5 py-2 rounded focus:outline-none border border-[#E1E6EF] bg-[#F8F9FC]"
                ></textarea>

                <input
                  type="submit"
                  value="Comment"
                  className="absolute right-2 top-0 bottom-0 m-auto cursor-pointer bg-[#2B52DD] h-fit px-3 py-1 text-white rounded"
                />
              </form>
            </>
          )}

          {showLikes && (
            <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
              <div className="relative bg-white h-1/2 w-1/4">
                <button
                  onClick={() => setShowLikes(false)}
                  className="absolute -right-4 -top-4 text-white text-xl"
                >
                  &times;
                </button>
                {likedBy.length}
              </div>
            </div>
          )}
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Post;
