"use client";
import React, { useState } from "react";

const CustomDropdownButton = () => {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      <div>
        <div
          className="w-52 h-12 rounded-lg bg-blue-300 flex justify-between items-center p-4 hover:bg-opacity-60 hover:cursor-pointer mb-1"
          onClick={handleClick}
        >
          <h1 className="font-medium text-lg font-sans text-black">
            Text Value
          </h1>
          <div className="flex items-center justify-end w-7 h-5 border-l border-l-gray-600 border-opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {show && (
          <div className="w-52 h-fit bg-gray-400 flex flex-col items-center justify-start p-2 rounded-lg gap-1">
            <div className="w-full h-fit p-1 border-b border-b-black border-opacity-35">
              <h1> Contoh Text </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomDropdownButton;
