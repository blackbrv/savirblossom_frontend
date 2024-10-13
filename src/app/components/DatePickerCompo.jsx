"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerCompo = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectDate(date);
  };

  return (
    <DatePicker
      className="w-72 p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg hover:bg-black hover:bg-opacity-5 focus:outline-none"
      selected={selectDate}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      popperPlacement="bottom"
    />
  );
};

export default DatePickerCompo;
