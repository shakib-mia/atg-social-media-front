import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { UserContext } from "../../Context/userContext";
import axios from "axios";

const CreatePosts = () => {
  const [postFieldFocused, setPostFieldFocused] = useState(false);

  const handleSubmit = (e, username) => {
    e.preventDefault();

    console.log(e.target.post.value);

    const body = {
      postedBy: username,
      postBody: e.target.post.value,
      likedBy: [],
      comments: [],
    };

    // console.log(body);

    axios
      .post("https://atg-social-media-backend.vercel.app/posts", body)
      .then((res) => console.log(res));

    e.target.reset();
    setPostFieldFocused(false);
  };

  return (
    <UserContext.Consumer>
      {({ username }) => (
        <>
          <InputField
            name="post"
            placeholder="What's on your mind"
            onFocus={() => setPostFieldFocused(true)}
          />

          {postFieldFocused && (
            <div
              className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50"
              // onClick={() => setPostFieldFocused(false)}
            >
              {/* <div className=""> */}
              <form
                className="w-1/2 h-1/2 bg-white p-3 overflow-y-auto"
                onSubmit={(e) => handleSubmit(e, username)}
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
              {/* </div> */}
            </div>
          )}
        </>
      )}
    </UserContext.Consumer>
  );
};

export default CreatePosts;
