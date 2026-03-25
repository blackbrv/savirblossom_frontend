"use client";

import SubscribeBg from "@/assets/subscribe-rose-bg.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SubscribeSection({
  animateOnce = false,
}: {
  animateOnce?: boolean;
}) {
  return (
    <section
      id="subscribe-section"
      className="relative flex h-[400px] max-h-[400px] min-w-screen flex-col items-center justify-center"
      data-aos-easing="ease-in-out-back"
      data-aos="fade-up"
      data-aos-once={animateOnce}
    >
      <Image
        className="absolute top-0 h-[400px] object-cover"
        width={1920}
        height={400}
        src={SubscribeBg}
        alt="rose-bg"
      />
      <div className="absolute inset-0 z-10 min-h-[400px] min-w-screen bg-black/50" />

      <div
        className="relative z-20 container mx-auto flex h-max w-full flex-col items-center justify-center gap-4 rounded-md bg-white/10 p-10 text-white"
        data-aos-easing="ease-in-out-back"
        data-aos="fade-up"
        data-aos-once={animateOnce}
      >
        <h3
          className="desktop-tablet__heading__h3 text-center !font-bold tracking-widest"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
          data-aos-once={animateOnce}
        >
          GET 50 % OFF BY SUBSCRIBE <br /> TO OUR NEWSLETTER
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="relative flex items-center gap-2 rounded-lg border border-white/20 p-2 focus-within:border-white"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
          data-aos-once={animateOnce}
        >
          <Input
            type="email"
            className="h-max max-w-[200px] border-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            placeholder="Your Email .."
          />
          <Button
            type="submit"
            className="text-danger-500 hover:bg-danger-500 desktop-tablet__body-medium__medium bg-white !font-medium hover:text-white"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
