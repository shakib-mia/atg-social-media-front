import React from "react";

const Submit = ({ value }) => {
  return (
    <input
      type="submit"
      value={value}
      className="bg-[#2B52DD] px-6 py-2 text-white rounded-full cursor-pointer"
    />
  );
};

export default Submit;
