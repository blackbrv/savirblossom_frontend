import React from "react";
import "./LandPage.css";
import TestimonialCards from "../components/TestimonialCards";

const LandingPage = () => {
  const maxTestiCards = 24;
  const Name = "Hani";
  const Message =
    "“Baru kali ini ketemu yang jualan bunga semurah dan sebesar ini”";

  return (
    <>
      {/* Bagian Header */}
      <section className="headerContainer">
        <div className="w-full h-full flex flex-col justify-center items-center text-white gap-2 lg:gap-6">
          <h1 className="font-bold text-3xl lg:text-8xl font-sans tracking-normal lg:tracking-widest">
            S A V I R B L O S S O M
          </h1>
          <p className="font-medium text-lg lg:text-4xl font-sans tracking-widest">
            Special Flower for Your Daily Person
          </p>
        </div>
      </section>

      {/* Bagian Testimonials */}
      <section
        id="testimonials"
        className="w-full h-4/5 rounded-xl -mt-[3%] lg:-mt-[1%] shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
      >
        <div className="w-full h-full flex flex-col justify-center p-20 gap-8">
          <h1 className="text-4xl text-black font-sans font-bold">
            Testimonials
          </h1>
          <div className="bg-white border border-5 border-black border-opacity-20 w-full h-full rounded-xl p-4">
            <div className="w-full max-full rounded-xl flex flex-wrap gap-5 p-4 overflow-y-auto justify-start items-center custom-scroll">
              {Array.from({ length: maxTestiCards }).map((_, index) => (
                <TestimonialCards key={index} name={Name} message={Message} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
