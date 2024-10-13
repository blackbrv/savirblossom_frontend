import React from "react";
import StarSvg from "../assets/svg/StarSvg";

const TestimonialCards = ({ name, message }) => {
  const maxStars = 4;
  return (
    <div className="w-64 h-72 bg-[#eceaea] rounded-lg flex flex-col justify-between items-center p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="flex gap-2">
        {Array.from({ length: maxStars }).map((_, index) => (
          <StarSvg key={index} />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-xl font-medium font-sans text-center">{name}</h1>
        <p className="text-lg font-sans text-center">{message}</p>
      </div>
    </div>
  );
};

export default TestimonialCards;
