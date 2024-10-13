"use client";
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const AmmountCompo = ({
  total = 0,
  buttonSize = "w-5 h-5",
  inputSize = "w-6 h-5",
}) => {
  const [amount, setAmount] = useState(total);

  const increment = () => {
    if (amount < 999) {
      setAmount((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (amount > 0) {
      setAmount((prev) => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setAmount(value === "" ? 1 : parseInt(value, 10));
    }
  };

  return (
    <div className="flex col-span-1 gap-1 items-center w-fit">
      <button
        onClick={decrement}
        className={`bg-white ${buttonSize} flex justify-center items-center rounded-sm shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-none`}
      >
        <FontAwesomeIcon icon={faMinus} className="w-3" />
      </button>
      <input
        type="string"
        value={amount}
        onChange={handleInputChange}
        className={`rounded-sm focus:outline-none text-center ${inputSize} bg-white font-semibold text-md hover:text-black focus:text-black flex items-center text-gray-700 outline-none shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-none focus:shadow-none`}
      ></input>
      <button
        onClick={increment}
        className={`bg-white ${buttonSize} flex justify-center items-center rounded-sm shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-none`}
      >
        <FontAwesomeIcon icon={faPlus} className="w-3" />
      </button>
    </div>
  );
};

export default AmmountCompo;
