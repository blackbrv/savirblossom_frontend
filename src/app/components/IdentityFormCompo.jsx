"use client";
import React from "react";
import DatePickerCompo from "./DatePickerCompo";
import PickupDropdown from "./PickupDropdown";

const IdentityFormCompo = ({
  label = "label",
  inputType = "string",
  variant = "defaults",
  value1,
  value2,
  onPickupChange, // New prop to handle pickup type change
}) => {
  const renderInput = () => {
    switch (variant) {
      case "DatePicker":
        return <DatePickerCompo />;
      case "PhoneNumber":
        return (
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            className="w-full h-full p-2 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:bg-black hover:bg-opacity-5 focus:outline-none "
          />
        );
      case "PickupType":
        return (
          <PickupDropdown
            option1={value1}
            option2={value2}
            onChange={onPickupChange} // Pass the onChange handler
          />
        );
      default:
        return (
          <input
            type={inputType}
            className="w-full h-full p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg  hover:bg-black hover:bg-opacity-5 focus:outline-none focus:border-opacity-35"
          />
        );
    }
  };

  return (
    <form className="flex justify-between items-center">
      <label className="font-bold text-xl font-sans">{label}</label>
      <div className="w-72 h-full">{renderInput()}</div>
    </form>
  );
};

export default IdentityFormCompo;
