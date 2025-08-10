"use client";

import Image, { StaticImageData } from "next/image";
import Flower01 from "@/assets/flower-1.png";
import FreshnessYouCanTrustImage from "@/assets/freshness-you-can-trust.png";
import PassionInEveryPetal from "@/assets/passion-in-every-petal.png";
import SubscribeBg from "@/assets/subscribe-rose-bg.png";
import GalleryLayout01 from "@/assets/gallery-layout-01.png";
import GalleryLayout02 from "@/assets/gallery-layout-02.png";
import GalleryLayout03 from "@/assets/gallery-layout-03.png";
import GalleryLayout04 from "@/assets/gallery-layout-04.png";

import { Button } from "@/components/ui/button";
import {
  BouquetList,
  HomeGridContent,
  OurSupports,
  WhatOurCustomerSay,
} from "@/lib/utils/constants";
import React from "react";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "phosphor-react";

const ImageWithDetail = ({
  image,
  title,
  description,
  linkProps,
  imagePosition = "left",
}: {
  imagePosition?: "left" | "right";
  image: string | StaticImageData;
  title: string;
  description: string;
  linkProps: {
    label: string;
    href: string;
  };
}) => {
  return (
    <div
      aria-label="freshness-you-can-trust"
      className={cn(
        "flex gap-5",
        imagePosition === "right" && "flex-row-reverse",
      )}
    >
      <div className="flex flex-col items-center justify-center max-w-[500px]">
        <Image
          src={image}
          alt={title.toLowerCase().replaceAll(" ", "-")}
          className="h-full w-auto object-cover"
          data-aos-easing="ease-in-out-back"
          data-aos={imagePosition === "right" ? "fade-left" : "fade-right"}
          data-aos-once="true"
        />
      </div>

      <div
        className="flex flex-col gap-2 justify-center"
        data-aos-easing="ease-in-out-back"
        data-aos={imagePosition === "right" ? "fade-right" : "fade-left"}
        data-aos-once="true"
      >
        <h3 className="desktop-tablet__heading__h3 !font-bold">{title}</h3>
        <p className="desktop-tablet__body-medium__medium text-grayscale-400 text-wrap">
          {description}
        </p>
        <Link
          href={linkProps.href}
          className="underline text-danger-500 desktop-tablet__body-medium__semibold hover:text-black flex gap-2 items-center w-max"
        >
          {linkProps.label}
          <MoveRight />
        </Link>
      </div>
    </div>
  );
};

export default function Page() {
  const [filterState, setFilterState] = React.useState("new-arrival");

  const filterComponents = [
    {
      label: "New Arrival",
      value: "new-arrival",
    },
    {
      label: "Gift Box",
      value: "gift-box",
    },

    {
      label: "Bouquet",
      value: "bouquet",
    },
    {
      label: "Bundling Package",
      value: "bundling-package",
    },
  ];

  return (
    <main className="container flex flex-col gap-2 items-center mx-auto w-full min-h-screen">
      <section className="grid grid-cols-6 w-full mx-auto my-auto items-center min-h-screen/2 pt-30 pb-30">
        <div className="col-span-3 w-full flex flex-col gap-4">
          <h5
            className="desktop-tablet__heading__h5"
            data-aos="fade-right"
            data-aos-once="true"
          >
            Your Daily Dose of Happy
          </h5>
          <h1
            className="desktop-tablet__heading__h1 !font-black text-danger-500"
            data-aos-delay="100"
            data-aos="fade-right"
            data-aos-once="true"
          >
            Fresh Flowers
          </h1>

          <p
            className="desktop-tablet__body-large__regular text-grayscale-400 break-words max-w-150 text-wrap"
            data-aos-delay="150"
            data-aos="fade-right"
            data-aos-once="true"
          >
            Brighten up your day with our vibrant and fresh blooms. We source
            directly from the best growers to ensure every bouquet arrives
            bursting with color and fragrance. It&apos;s the easiest way to
            spread a little joy
          </p>

          <div
            className="flex gap-2 items-center "
            data-aos-delay="200"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <Button className="text-white hover:bg-danger-500 transition-all duration-300">
              Order Now
            </Button>

            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        <div
          className="col-span-3 col-start-4 flex flex-col gap-2 w-full items-center justify-center"
          data-aos-delay="230"
          data-aos="fade-left"
          data-aos-once="true"
        >
          <Image src={Flower01} alt="first-flower" />
        </div>
      </section>

      <section className="h-max flex flex-col items-center">
        <div
          className="bg-danger-500/10 flex justify-center items-center min-w-screen p-4"
          data-aos="fade-down"
          data-aos-once="true"
        >
          <div className="container w-full mx-auto items-center justify-between gap-10 flex">
            {OurSupports.map((supports, index) => (
              <div
                key={index}
                className="text-danger-500 flex gap-2 items-center justify-center"
                data-aos-delay={100 * (index + 1)}
                data-aos="fade-up"
                data-aos-once="true"
              >
                <supports.icon size={32} />

                <div className="flex flex-col">
                  <p className="desktop-tablet__body-large__semibold">
                    {supports.title}
                  </p>

                  <p className="desktop-tablet__body-medium__regular text-grayscale-400">
                    {supports.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full container mx-auto my-auto grid grid-cols-2 gap-4 py-20 px-10">
          {HomeGridContent.map((item, index) => (
            <div
              key={index}
              className="w-full relative flex rounded-lg overflow-hidden bg-gray-200  aspect-[16/5] p-8 items-center justify-center hover:shadow-sm transition-all duration-300 hover:cursor-pointer hover:bg-danger-500 hover:text-white text-black group"
              data-aos-delay={100 * (index + 1)}
              data-aos="fade-in"
              data-aos-once="true"
            >
              <div className="flex flex-col gap-2 flex-1 z-10">
                <p className="text-xl">{item.title}</p>
                <p className="text-4xl font-bold">{item.subTitle}</p>
              </div>

              <Image
                src={item.image}
                alt={item.title + " " + item.subTitle}
                width={200}
                height={200}
                className="absolute bottom-0 right-0 h-full w-auto object-contain group-hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="w-full container mx-auto flex flex-col gap-10 items-center h-max p-10">
        <h3
          className="desktop-tablet__heading__h3 !font-bold"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
          data-aos-once="true"
        >
          Discover Your Perfect Bouquet.
        </h3>

        <p
          className="desktop-tablet__body-medium__regular text-grayscale-400 max-w-150 text-center text-wrap"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
          data-aos-once="true"
        >
          Whether you&apos;re celebrating, gifting, or simply treating yourself,
          we have the perfect arrangement for every occasion. Explore our
          curated selection of bouquet types to find exactly what you&apos;re
          looking for.
        </p>

        <div
          className="flex gap-4 items-cecnter justify-center w-full"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-right"
          data-aos-once="true"
        >
          {filterComponents.map((filter, index) => (
            <Button
              key={index}
              className={cn(
                "rounded-full bg-white border border-grayscale-400 transition-all duration-300 hover:bg-danger-500 hover:text-white hover:border-danger-500",
                filterState === filter.value &&
                  "bg-danger-500 text-white hover:bg-white hover:text-primary border-danger-500 hover:border-grayscale-400",
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFilterState(filter.value);
              }}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-3 items-center justify-center gap-4">
          {BouquetList.map((bouquet, index) => (
            <ProductCard
              data-aos-delay={50 * (index + 1)}
              data-aos-easing="ease-in-out-back"
              data-aos="fade-in"
              data-aos-once="true"
              title={bouquet.product_name}
              isNewArrival={bouquet.is_new_arrival}
              key={index}
              image={bouquet.image}
              onCartClick={(e) => {
                e.preventDefault();
                console.log("item added to cart");
              }}
            />
          ))}
        </div>
      </section>

      <section
        className="min-w-screen max-h-[400px] relative h-[400px] flex flex-col items-center justify-center"
        data-aos-easing="ease-in-out-back"
        data-aos="fade-up"
        data-aos-once="true"
      >
        <Image
          className="absolute top-0 object-cover h-[400px]"
          width={1920}
          height={400}
          src={SubscribeBg}
          alt="rose-bg"
        />
        <div className="absolute inset-0 bg-black/50 z-10 min-w-screen min-h-[400px]" />

        <div
          className="relative z-20 flex flex-col gap-4 items-center justify-center h-max text-white p-10 rounded-md bg-white/10 w-full container mx-auto"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <h3
            className="desktop-tablet__heading__h3 !font-bold tracking-widest text-center"
            data-aos-easing="ease-in-out-back"
            data-aos="fade-up"
            data-aos-once="true"
          >
            GET 50 % OFF BY SUBSCRIBE <br /> TO OUR NEWSLETTER
          </h3>

          <div
            className="relative flex gap-2 items-center p-2 border border-white/20 rounded-lg focus-within:border-white"
            data-aos-easing="ease-in-out-back"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <Input
              type="email"
              className="max-w-[200px] h-max focus-visible:ring-transparent border-0 focus-visible:ring-offset-0"
              placeholder="Your Email .."
            />
            <Button className="bg-white text-danger-500 hover:bg-danger-500 hover:text-white desktop-tablet__body-medium__medium !font-medium">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <section className=" flex flex-col items-center justify-center container mx-auto py-10">
        <ImageWithDetail
          image={FreshnessYouCanTrustImage}
          title="Freshness You Can Trust"
          description="We believe every bouquet should be a testament to quality. That's why we meticulously source our flowers from trusted growers, ensuring each stem is fresh, vibrant, and long-lasting. Experience the difference true quality makes."
          linkProps={{
            label: "Learn More",
            href: "#",
          }}
        />

        <ImageWithDetail
          image={PassionInEveryPetal}
          imagePosition="right"
          title="Passion in Every Petal."
          description="Our commitment to quality goes beyond a simple guarantee. It's an art form. Each arrangement is handcrafted with a passion for floristry, showcasing the natural elegance and beauty of our premium blooms."
          linkProps={{
            label: "Discover our process",
            href: "#",
          }}
        />
      </section>

      <section className="container mx-auto h-max p-20 flex flex-col gap-4 items-center justify-center">
        <h3
          className="desktop-tablet__heading__h3 !font-semibold"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
        >
          What our Customer Say
        </h3>
        <p
          className="desktop-tablet__body-medium__medium text-grayscale-400 text-center max-w-[500px] text-wrap"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
        >
          We are proud to have been a part of so many special moments. Discover
          the heartfelt stories and glowing reviews from those who have
          experienced the magic of our arrangements.
        </p>

        <div className="w-full h-max flex flex-col items-center justify-center">
          <Carousel>
            <CarouselContent>
              {WhatOurCustomerSay.map((rating, index) => (
                <CarouselItem
                  key={index}
                  data-aos-delay={50 * (index + 1)}
                  className="flex-[0_0_calc(35%-1rem)]"
                  data-aos-easing="ease-in-out-back"
                  data-aos="fade-up"
                >
                  <div className="flex flex-col gap-4 items-center justify-center">
                    <div className="w-10 h-10 min-w-10 min-h-10 bg-danger-500 rounded-full flex flex-col items-center justify-center p-2 text-white">
                      {rating.name
                        .split(" ")
                        .map((item) => item.charAt(0))
                        .join("")}
                    </div>

                    <p className="desktop-tablet__body-medium__semibold capitalize">
                      {rating.name}
                    </p>

                    <div className="flex gap-2 items-center justify-center w-max">
                      {Array.from({ length: rating.star_rating }).map(
                        (_, index) => (
                          <Star
                            size={24}
                            key={index}
                            weight="fill"
                            className="text-yellow-500"
                          />
                        ),
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="border-grayscale-400 hover:border-danger-500 hover:bg-danger-500/20"
              data-aos-easing="ease-in-out-back"
              data-aos="fade-right"
            />
            <CarouselNext
              className="border-grayscale-400 hover:border-danger-500 hover:bg-danger-500/20"
              data-aos-easing="ease-in-out-back"
              data-aos="fade-left"
            />
          </Carousel>
        </div>
      </section>

      <section className="w-full container mx-auto flex flex-col gap-4 items-center p-20">
        <h3
          className="desktop-tablet__heading__h3 !font-bold"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-down"
        >
          Moments, Made with Flowers.
        </h3>
        <p
          className="desktop-tablet__body-medium__medium text-grayscale-400 max-w-[500px] text-center"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-down"
        >
          Every photograph in our gallery tells a story of celebration, love,
          and life. Discover how our flowers have brought beauty to countless
          special moments.
        </p>

        <div className="grid grid-cols-4 grid-rows-4 gap-4 max-h-[600px]">
          <div
            className="col-span-2 row-span-4 min-w-full "
            data-aos-easing="ease-in-out-back"
            data-aos="fade-right"
          >
            <Image
              src={GalleryLayout01}
              alt={"flower-01"}
              className="object-cover w-full h-full rounded-2xl hover:scale-105 transition-all duration-300"
            />
          </div>
          <div
            className="col-span-2 row-span-2 col-start-3 min-w-full "
            data-aos-easing="ease-in-out-back"
            data-aos="fade-down-left"
          >
            <Image
              src={GalleryLayout02}
              alt={"flower-02"}
              className="object-cover w-full h-full rounded-2xl hover:scale-105 transition-all duration-300"
            />
          </div>
          <div
            className="row-span-2 col-start-3 row-start-3 min-w-full "
            data-aos-easing="ease-in-out-back"
            data-aos="fade-up"
          >
            <Image
              src={GalleryLayout03}
              alt={"flower-03"}
              className="object-cover w-full h-full rounded-2xl hover:scale-105 transition-all duration-300"
            />
          </div>
          <div
            className="row-span-2 col-start-4 row-start-3 min-w-full "
            data-aos-easing="ease-in-out-back"
            data-aos="fade-up-left"
          >
            <Image
              src={GalleryLayout04}
              alt={"flower-04"}
              className="object-cover w-full h-full rounded-2xl hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto flex flex-col gap-4 items-center justice  p-20"></section>
    </main>
  );
}
