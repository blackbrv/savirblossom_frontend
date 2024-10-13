import React from "react";
import BouquetListCards from "../../components/BouquetListCards";

const OrderPage = () => {
  const maxCardList = 12;
  return (
    <>
      <section>
        <div className="w-full h-full flex flex-col justify-center pt-20 pl-20 pr-20 pb-10 gap-8">
          <h1 className="text-4xl text-black font-sans font-bold">
            Order Buket
          </h1>
          <div className="w-full h-[650px] bg-white rounded-xl border-2 border-black border-opacity-20 p-10 ">
            <div className="flex flex-wrap w-full h-full gap-4 justify-start items-center overflow-y-auto custom-scroll">
              {Array.from({ length: maxCardList }).map((_, index) => (
                <BouquetListCards key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full h-fit items-center justify-center pb-10">
          <a
            href="../../pages/checkoutpage"
            className="w-fit pt-1 pb-1 pl-2 pr-2 h-full rounded-lg bg-[#039ddf] border border-black border-opacity-20 text-white font-bold font-sans shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-none"
          >
            Buat Pesanan
          </a>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
