import React from "react";

const Submit = (props) => {
  return (
    <input
      type="submit"
      // value={value}
      {...props}
      className="bg-[#2B52DD] px-6 py-2 text-white rounded-full cursor-pointer opacity-100 disabled:opacity-60 disabled:cursor-not-allowed"
    />
  );
};

export default Submit;
