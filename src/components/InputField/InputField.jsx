import React from "react";

const InputField = (props) => {
  const { label, id } = props;
  return (
    <div className="w-full">
      {label && (
        <label className="ml-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="w-full px-5 py-2 rounded focus:outline-none border border-[#E1E6EF] bg-[#F8F9FC]"
        {...props}
      />
    </div>
  );
};

export default InputField;
