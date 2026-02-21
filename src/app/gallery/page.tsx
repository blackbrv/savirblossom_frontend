import Image from "next/image";
import Banner from "@/assets/Banner.png";
import GetInTouchBanner from "@/assets/get-in-touch-banner.png";
import GetInTouchForm from "@/components/Forms/GetInTouchForm";

export default function Page() {
  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center gap-2">
      <section className="flex max-w-7xl items-center justify-between gap-24 px-24 py-24">
        <div className="flex max-w-xl flex-col gap-2">
          <h5 className="desktop-tablet__heading__h5 !font-medium text-black">
            Explore our collection of beautiful
          </h5>

          <h1 className="text-danger-500 desktop-tablet__heading__h2 !font-bold capitalize">
            handcrafted
            <br />
            bouquets
          </h1>

          <p className="desktop-tablet__body-xlarge__semibold text-grayscale-black">
            Find the perfect inspiration for your
            <br />
            Custom arrangement
          </p>
        </div>

        <div className="relative grid h-[420px] w-[420px] grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
          <div className="relative row-span-2 w-full rounded-[inherit]">
            <Image
              src={Banner}
              alt="Flower-image"
              className="rounded-[inherit] object-cover"
              fill
            />
          </div>
          <div className="relative col-span-1 col-start-2 row-span-1 w-full rounded-[inherit]">
            <Image
              src={Banner}
              alt="Flower-image"
              className="rounded-[inherit] object-cover"
              fill
            />
          </div>

          <div className="relative col-span-1 col-start-2 row-span-1 row-start-2 w-full rounded-[inherit]">
            <Image
              src={Banner}
              alt="Flower-image"
              className="rounded-[inherit] object-cover"
              fill
            />
          </div>
        </div>
      </section>

      {/* Focus here */}
      <section
        id="get-in-touch-section"
        className="relative flex h-screen max-h-screen min-w-screen flex-col items-center"
      >
        <Image
          src={GetInTouchBanner}
          alt="Flowers background"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full max-w-7xl items-center justify-between gap-24 p-24">
          <div className="flex max-w-md flex-col gap-4 text-white">
            <h2 className="desktop-tablet__heading__h3 !font-semibold">
              We’d Love to Hear From You
            </h2>

            <p className="desktop-tablet__body-large__medium text-gray-200">
              Whether you want to place a custom order or just need a little
              advice, we are ready to assist.
            </p>

            <p className="desktop-tablet__body-large__medium text-gray-200">
              We’re here to help you create a beautiful and memorable moment.
            </p>
          </div>

          <GetInTouchForm />
        </div>
      </section>
    </main>
  );
}
