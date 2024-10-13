import React from "react";
import Image from "next/image";
import image30 from "../assets/images/png/30k.png";
import AmmountCompo from "@/app/components/AmmountCompo";

const BouquetOrderedList = ({ price = "30K", amount }) => {
  return (
    <div className="flex justify-between items-center p-4 rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <Image src={image30} className="w-36 h-36 rounded-lg object-cover" />
      <div className="flex flex-col gap-2 items-end justify-center">
        <h1 className="text-3xl font-bold">{price}</h1>
        <AmmountCompo buttonSize="w-6 h-6" inputSize="w-8 h-6" total={amount} />
      </div>
    </div>
  );
};

export default BouquetOrderedList;
