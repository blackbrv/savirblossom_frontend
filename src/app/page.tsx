import Image from "next/image";
import Flower01 from "@/assets/flower-1.png";
import { Button } from "@/components/ui/button";
import { HomeGridContent, OurSupports } from "@/lib/utils/constants";

export default function Home() {
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
    </main>
  );
}
