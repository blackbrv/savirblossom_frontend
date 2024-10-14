import Image from "next/image";
import React from "react";
import logo from "../assets/logo/logo ajng-white.png";
import IgLogo from "../assets/svg/IgLogo";
import TiktokLogo from "../assets/svg/TiktokLogo";
import WhatsappLogo from "../assets/svg/WhatsappLogo";
import { IG_LINK, TIKTOK_LINK, WHATSAPP_LINK } from "../../global";

//TODO: OPTIMIZE FOR MOBILE

const Footer = () => {
  return (
    <section>
      <div className="w-full h-full bg-[#131313] flex gap-8 justify-center items-center p-8">
        <Image src={logo} className="w-1/5" alt="Savirblossom" />
        <div className="w-[30%] flex gap-8">
          <p className="text-[#eceaea] text-lg text-justify">
            Savirblossom siap membantu Anda memberikan kejutan indah bagi orang
            tersayang. Dengan setiap rangkaian bunga, kami berharap dapat
            menyebarkan kebahagiaan dan cinta. Jangan lupa untuk selalu berbagi
            kebahagiaan!
          </p>
          <div className="h-1px bg-white w-3 flex flex-col rounded-full" />
        </div>
        <div className="text-white flex flex-col h-full lg:gap-5">
          <h1 className="font-medium text-lg">Social Media</h1>
          <div className="flex flex-col w-full h-full gap-3">
            <a
              href={IG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <IgLogo />
              <h1 className="text-xl mb-1 text-center">@savirafad</h1>
            </a>
            <a
              href={TIKTOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <TiktokLogo />
              <h1 className="text-xl mb-1 text-center">@savirblossom</h1>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <WhatsappLogo />
              <h1 className="text-lg mb-0 text-center">+62 812-8221-3266</h1>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
