"use client";

import Image, { StaticImageData } from "next/image";
import Flower01 from "@/assets/flower-1.png";
import FreshnessYouCanTrustImage from "@/assets/freshness-you-can-trust.png";
import PassionInEveryPetal from "@/assets/passion-in-every-petal.png";
import GalleryLayout01 from "@/assets/gallery-layout-01.png";
import GalleryLayout02 from "@/assets/gallery-layout-02.png";
import GalleryLayout03 from "@/assets/gallery-layout-03.png";
import GalleryLayout04 from "@/assets/gallery-layout-04.png";

import { Button } from "@/components/ui/button";
import {
  BouquetList,
  HomeGridContent,
  LatestBlogs,
  ListShopFilter,
  OurSupports,
  WhatOurCustomerSay,
} from "@/lib/utils/constants";
import React from "react";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
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
import BlogsCard from "@/components/BlogsCard";
import SubscribeSection from "@/components/ShopSection/SubscribeSection";

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
      <div className="flex max-w-[500px] flex-col items-center justify-center">
        <Image
          src={image}
          alt={title.toLowerCase().replaceAll(" ", "-")}
          className="h-full w-auto object-cover"
          data-aos-easing="ease-in-out-back"
          data-aos={imagePosition === "right" ? "fade-left" : "fade-right"}
        />
      </div>

      <div
        className="flex flex-col justify-center gap-2"
        data-aos-easing="ease-in-out-back"
        data-aos={imagePosition === "right" ? "fade-right" : "fade-left"}
      >
        <h3 className="desktop-tablet__heading__h3 !font-bold">{title}</h3>
        <p className="desktop-tablet__body-medium__medium text-grayscale-400 text-wrap">
          {description}
        </p>
        <Link
          href={linkProps.href}
          className="text-danger-500 desktop-tablet__body-medium__semibold flex w-max items-center gap-2 underline hover:text-black"
        >
          {linkProps.label}
          <MoveRight />
        </Link>
      </div>
    </div>
  );
};

export default function Page() {
  const [filterState, setFilterState] = React.useState("new_arrival");

  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center gap-2">
      <section className="min-h-screen/2 mx-auto my-auto grid w-full grid-cols-6 items-center pt-30 pb-30">
        <div className="col-span-3 flex w-full flex-col gap-4">
          <h5 className="desktop-tablet__heading__h5" data-aos="fade-right">
            Your Daily Dose of Happy
          </h5>
          <h1
            className="desktop-tablet__heading__h1 text-danger-500 !font-black"
            data-aos-delay="100"
            data-aos="fade-right"
          >
            Fresh Flowers
          </h1>

          <p
            className="desktop-tablet__body-large__regular text-grayscale-400 max-w-150 text-wrap break-words"
            data-aos-delay="150"
            data-aos="fade-right"
          >
            Brighten up your day with our vibrant and fresh blooms. We source
            directly from the best growers to ensure every bouquet arrives
            bursting with color and fragrance. It&apos;s the easiest way to
            spread a little joy
          </p>

          <div
            className="flex items-center gap-2"
            data-aos-delay="200"
            data-aos="fade-right"
          >
            <Button className="hover:bg-danger-500 text-white transition-all duration-300">
              Order Now
            </Button>

            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        <div
          className="col-span-3 col-start-4 flex w-full flex-col items-center justify-center gap-2"
          data-aos-delay="230"
          data-aos="fade-left"
        >
          <Image src={Flower01} alt="first-flower" />
        </div>
      </section>

      <section className="flex h-max flex-col items-center">
        <div
          className="bg-danger-500/10 flex min-w-screen items-center justify-center p-4"
          data-aos="fade-down"
        >
          <div className="container mx-auto flex w-full items-center justify-between gap-10">
            {OurSupports.map((supports, index) => (
              <div
                key={index}
                className="text-danger-500 flex items-center justify-center gap-2"
                data-aos-delay={100 * (index + 1)}
                data-aos="fade-up"
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

        <div className="container mx-auto my-auto grid w-full grid-cols-2 gap-4 px-10 py-20">
          {HomeGridContent.map((item, index) => (
            <div
              key={index}
              className="hover:bg-danger-500 group relative flex aspect-[16/5] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 p-8 text-black transition-all duration-300 hover:cursor-pointer hover:text-white hover:shadow-sm"
              data-aos-delay={100 * (index + 1)}
              data-aos="fade-in"
            >
              <div className="z-10 flex flex-1 flex-col gap-2">
                <p className="text-xl">{item.title}</p>
                <p className="text-4xl font-bold">{item.subTitle}</p>
              </div>

              <Image
                src={item.image}
                alt={item.title + " " + item.subTitle}
                width={200}
                height={200}
                className="absolute right-0 bottom-0 h-full w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto flex h-max w-full flex-col items-center gap-10 p-10">
        <h3
          className="desktop-tablet__heading__h3 !font-bold"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
        >
          Discover Your Perfect Bouquet.
        </h3>

        <p
          className="desktop-tablet__body-medium__regular text-grayscale-400 max-w-150 text-center text-wrap"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
        >
          Whether you&apos;re celebrating, gifting, or simply treating yourself,
          we have the perfect arrangement for every occasion. Explore our
          curated selection of bouquet types to find exactly what you&apos;re
          looking for.
        </p>

        <div
          className="items-cecnter flex w-full justify-center gap-4"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-right"
        >
          {ListShopFilter.map((filter, index) => (
            <Button
              key={index}
              className={cn(
                "border-grayscale-400 hover:bg-danger-500 hover:border-danger-500 rounded-full border bg-white transition-all duration-300 hover:text-white",
                filterState === filter.value &&
                  "bg-danger-500 hover:text-primary border-danger-500 hover:border-grayscale-400 text-white hover:bg-white",
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFilterState(filter.value);
              }}
            >
              {filter.title}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-3 items-center justify-center gap-4">
          {BouquetList.map((bouquet, index) => (
            <ProductCard
              data-aos-delay={50 * (index + 1)}
              data-aos-easing="ease-in-out-back"
              data-aos="fade-in"
              title={bouquet.product_name}
              price={`${bouquet.currency} ${bouquet.price}`}
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

      <SubscribeSection />

      <section className="container mx-auto flex flex-col items-center justify-center py-10">
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

      <section className="container mx-auto flex h-max flex-col items-center justify-center gap-4 p-20">
        <h3
          className="desktop-tablet__heading__h3 !font-semibold"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
        >
          What our Customer Say
        </h3>
        <p
          className="desktop-tablet__body-medium__medium text-grayscale-400 max-w-[500px] text-center text-wrap"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-up"
        >
          We are proud to have been a part of so many special moments. Discover
          the heartfelt stories and glowing reviews from those who have
          experienced the magic of our arrangements.
        </p>

        <div className="flex h-max w-full flex-col items-center justify-center">
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
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="bg-danger-500 flex h-10 min-h-10 w-10 min-w-10 flex-col items-center justify-center rounded-full p-2 text-white">
                      {rating.name
                        .split(" ")
                        .map((item) => item.charAt(0))
                        .join("")}
                    </div>

                    <p className="desktop-tablet__body-medium__semibold capitalize">
                      {rating.name}
                    </p>

                    <div className="flex w-max items-center justify-center gap-2">
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

                    <p className="desktop-tablet__body-medium__regular text-grayscale-600 text-center">
                      {rating.comments}
                    </p>
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

      <section className="container mx-auto flex w-full flex-col items-center gap-4 p-20">
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

        <div className="grid max-h-[600px] grid-cols-4 grid-rows-4 gap-4">
          <div
            className="col-span-2 row-span-4 min-w-full"
            data-aos-easing="ease-in-out-back"
            data-aos="fade-right"
          >
            <Image
              src={GalleryLayout01}
              alt={"flower-01"}
              className="h-full w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
          <div
            className="col-span-2 col-start-3 row-span-2 min-w-full"
            data-aos-easing="ease-in-out-back"
            data-aos="fade-down-left"
          >
            <Image
              src={GalleryLayout02}
              alt={"flower-02"}
              className="h-full w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
          <div
            className="col-start-3 row-span-2 row-start-3 min-w-full"
            data-aos-easing="ease-in-out-back"
            data-aos="fade-up"
          >
            <Image
              src={GalleryLayout03}
              alt={"flower-03"}
              className="h-full w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
          <div
            className="col-start-4 row-span-2 row-start-3 min-w-full"
            data-aos-easing="ease-in-out-back"
            data-aos="fade-up-left"
          >
            <Image
              src={GalleryLayout04}
              alt={"flower-04"}
              className="h-full w-full rounded-2xl object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section className="justice container mx-auto flex flex-col items-center gap-4 p-20">
        <h3
          className="desktop-tablet__heading__h3 !font-bold"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-down"
        >
          Our Latest Blogs.
        </h3>
        <p
          className="desktop-tablet__body-medium__medium text-grayscale-400 max-w-[500px] text-center"
          data-aos-easing="ease-in-out-back"
          data-aos="fade-down"
        >
          Stay updated with the latest in floral design, flower care tips, and
          inspiring stories. Our blog is a place for flower lovers to learn,
          grow, and be inspired.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {LatestBlogs.map((blog, index) => (
            <BlogsCard
              categoriesProps={{
                backgroundColor: blog.category_background_color,
                textColor: blog.category_text_color,
              }}
              data-aos-easing="ease-in-out-back"
              data-aos="fade-down"
              key={index}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              href={blog.href}
              categories={blog.categories}
              estimatedReadTime={blog.estimated_read_time}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
