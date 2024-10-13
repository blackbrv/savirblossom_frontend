import React from "react";
import Mapso from "@/app/assets/images/mapso.png";
import ImagesWLens from "@/app/components/ImagesWLens";

const page = () => {
  return (
    <>
      <section>
        <div className="w-full h-full p-16">
          <div className="w-full h-full flex flex-row mb-10">
            <div className="w-full h-full flex justify-start items-baseline">
              <h1 className="text-9xl font-bold font-sans">
                Tentang <br /> Kami
              </h1>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-start gap-5">
              <h1 className="text-2xl font-semibold font-sans">
                Dimana kami ?
              </h1>
              <ImagesWLens
                where={Mapso}
                className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              />
            </div>
          </div>
          <div className="w-full h-full flex justify-start items-center">
            <h1 className="text-xl font-sans font-semibold">
              Temui kami di: <br />
              JL. Cilengkrang 1 ,Komplek Griya Sakinah Blok 5 no 6
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
