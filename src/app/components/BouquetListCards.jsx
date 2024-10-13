import Image from "next/image";
import React from "react";
import flower1 from "../assets/images/png/30k.png";
import AmmountCompo from "./AmmountCompo";
import ImagesWLens from "./ImagesWLens";

const BouquetListCards = () => {
  return (
    <div className="w-[300px] h-[330px] bg-[#eceaea] rounded-xl border border-black border-opacity-20 p-3 flex flex-col items-start shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-none">
      <div className="w-full h-3/4 rounded-lg">
        <Image
          src={flower1}
          alt="Bunga1"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full h-full p-2">
        <h1 className="text-3xl font-bold text-black text-center">30K</h1>
        <AmmountCompo />
      </div>
    </div>
  );
};

export default BouquetListCards;
