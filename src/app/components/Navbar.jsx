"use client";
import React from "react";
import Image from "next/image";
import SbLogo from "../assets/logo/logo ajng-white.png";
import CartSvg from "../assets/svg/cart";

//TODO:OPTIMIZE FOR MOBILE

const Navbar = () => {
  const scrollToTestimonials = () => {
    const element = document.getElementById("testimonials");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative">
      <div className="bg-[#131313] w-full h-full flex flex-row items-center justify-between pt-4 pb-4 pl-7 pr-7 rounded-bl-xl rounded-br-xl">
        <div>
          <a href="/">
            <Image
              src={SbLogo}
              className="w-20 h-auto"
              alt="Savirblossom"
              priority="false"
            />
          </a>
        </div>
        <ul className="text-[#eceaea] flex flex-row gap-4 text-xl font-semibold">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="../pages/orderpage/">Order</a>
          </li>
          <li>
            <a href="/#testimonials" onClick={scrollToTestimonials}>
              Testimonials
            </a>
          </li>
          <li>
            <a href="../pages/aboutpage/">About</a>
          </li>
          <li>
            <a href="../pages/checkoutpage/">
              <CartSvg colorFill={"#eceaea"} claName="w-8" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
