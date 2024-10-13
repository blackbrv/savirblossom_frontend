import React, { useState } from "react";

const PickupDropdown = ({ option1, option2, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(option1);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value); // Pass the selected value to the parent
  };

  return (
    <select
      className="w-full h-full rounded-lg p-2 hover:cursor-pointer shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:bg-black hover:bg-opacity-5"
      value={selectedValue}
      onChange={handleChange}
    >
      <option value={option1}>{option1}</option>
      <option value={option2}>{option2}</option>
    </select>
  );
};

export default PickupDropdown;
