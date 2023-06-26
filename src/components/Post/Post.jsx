import React, { useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/userContext";

const Post = ({ postBody, postedBy, likedBy, comments, _id }) => {
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [options, showOptions] = useState(false);
  const [postFieldFocused, setPostFieldFocused] = useState(false);
  const postRef = useRef(null);
  const [editPostValue, setEditPostValue] = useState(postBody);

  const handleLike = () => {
    const token = localStorage.getItem("token");
    const body = { _id, token, likedBy: [...likedBy] };
    axios
      .put("https://atg-social-media-backend.vercel.app/like", body)
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
      .put("https://atg-social-media-backend.vercel.app/comments", body)
      .then((res) => console.log(res));

    e.target.reset();
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://atg-social-media-backend.vercel.app/posts/${id}`)
      .then((res) => console.log(res));
  };

  const handleEditPost = (e) => {
    e.preventDefault();

    const body = {
      postBody: e.target.post.value,
    };
    // console.log(body);
    axios
      .put(`https://atg-social-media-backend.vercel.app/posts/${_id}`, body)
      .then((res) => console.log(res));
    e.target.reset();
    setPostFieldFocused(false);
  };

  return (
    <UserContext.Consumer>
      {({ username }) => (
        <>
          <div className="mt-4 p-2 shadow">
            <div className="flex justify-between items-center">
              <p className="capitalize font-medium">
                {postedBy.includes("-")
                  ? postedBy.split("-").join(" ")
                  : postedBy}
              </p>

              {username === postedBy && (
                <div className="relative">
                  <div
                    className="text-3xl cursor-pointer select-none"
                    onClick={() => showOptions(!options)}
                  >
                    ...
                  </div>

                  {options && (
                    <ul className="absolute right-0 bg-white py-3 shadow-lg rounded">
                      <li
                        className="py-3 px-5 cursor-pointer hover:bg-slate-200"
                        onClick={() => {
                          setPostFieldFocused(true);
                          showOptions(false);
                        }}
                      >
                        Edit
                      </li>
                      <li
                        className="py-3 px-5 cursor-pointer hover:bg-slate-200"
                        onClick={() => {
                          handleDelete(_id);
                          showOptions(false);
                        }}
                      >
                        Delete
                      </li>
                    </ul>
                  )}
                </div>
              )}
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
                {comments.length}{" "}
                {comments.length === 1 ? "comment" : "comments"}
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
                  <h2 className="border-b p-4">Likes: {likedBy.length}</h2>

                  <ul>
                    {likedBy.map((item) => (
                      <li className="py-3 px-3">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          {postFieldFocused && (
            <div
              className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50"
              // onClick={() => setPostFieldFocused(false)}
            >
              <form
                className="w-1/2 h-1/2 bg-white p-3 overflow-y-auto"
                onSubmit={(e) => handleEditPost(e)}
              >
                <button
                  className="absolute top-48 right-[29rem] text-white"
                  onClick={() => setPostFieldFocused(false)}
                >
                  &times;
                </button>
                <textarea
                  name="post"
                  id="post"
                  className="w-full p-2 rounded focus:outline-none border border-[#E1E6EF] bg-[#F8F9FC]"
                  placeholder="What's on your mind"
                  value={editPostValue}
                  onChange={(e) => setEditPostValue(e.target.value)}
                  ref={postRef}
                  rows="10"
                ></textarea>

                <div className="text-center mt-4">
                  <input
                    type="submit"
                    value="Post"
                    className="text-center bg-[#2B52DD] text-white px-4 py-1 uppercase font-medium rounded tracking-wide cursor-pointer"
                  />
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </UserContext.Consumer>
  );
};

export default Post;
