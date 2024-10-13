"use client";
import React, { useState } from "react";
import IdentityFormCompo from "../../components/IdentityFormCompo";
import BouquetOrderedList from "@/app/components/BouquetOrderedList";

const Page = () => {
  const [pickupMethod, setPickupMethod] = useState("Diambil");
  const maxOrderedList = 12;

  return (
    <section className="p-16 flex flex-row gap-8 justify-center">
      <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-black font-sans">Identitas</h1>
        <div className="bg-white border-2 border-black border-opacity-20 h-full w-full rounded-xl flex flex-col p-8 gap-5">
          <IdentityFormCompo label="Nama" inputType="string" />
          <IdentityFormCompo label="Instagram" inputType="string" />
          <IdentityFormCompo
            label="No.Telfon"
            variant="PhoneNumber"
            inputType="string"
          />
          <IdentityFormCompo variant="DatePicker" label="Tanggal Pengambilan" />
          <IdentityFormCompo label="Jam" />
          <IdentityFormCompo
            variant="PickupType"
            label="Pengambilan"
            value1="Diambil"
            value2="Diantar"
            onPickupChange={setPickupMethod}
          />
          {pickupMethod === "Diantar" && <IdentityFormCompo label="Alamat" />}
          <div className="flex w-full h-fit items-center justify-center pt-5">
            <a
              href="#"
              className="w-fit pt-1 pb-1 pl-2 pr-2 h-full rounded-lg bg-[#039ddf] border border-black border-opacity-20 text-white font-bold font-sans shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-none"
            >
              Buat Pesanan
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-black font-sans">
          Pesanan Kamu
        </h1>
        <div className="bg-white border-2 border-black border-opacity-20 w-full h-full rounded-xl p-4">
          <div className="flex flex-col gap-5 custom-scroll rounded-xl p-2 h-full overflow-y-scroll">
            {Array.from({ length: maxOrderedList }).map((_, index) => (
              <BouquetOrderedList key={index} price="20K" amount={0} />
            ))}
          </div>
          <div className="flex w-full h-fit items-center justify-center pt-4">
            <a
              href="../../pages/orderpage/"
              className="w-fit pt-1 pb-1 pl-2 pr-2 h-full rounded-lg bg-[#e7e7e7] border border-black border-opacity-20 text-black font-bold font-sans shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-none"
            >
              Ubah Pesanan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
