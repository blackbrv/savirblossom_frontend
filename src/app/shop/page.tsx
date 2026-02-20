import Image from "next/image";
import ShopBackground from "@/assets/colourful-flowers-3840x2160-4k-hd-wallpaper-flowers-10299 1 (1).png";
import SubscribeBg from "@/assets/subscribe-rose-bg.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <section className="relative flex h-full w-full flex-col items-center justify-center gap-2 p-24">
        <Image
          src={ShopBackground}
          width={1920}
          height={400}
          alt="shop-background"
          className="absolute top-0 h-full w-full object-cover brightness-50"
        />
        <div className="z-10 flex max-w-3xl flex-col items-center justify-center gap-2 text-center">
          <h1 className="desktop-tablet__heading__h2 font-semibold tracking-wide text-white">
            Discover Your Perfect Bouquet.
          </h1>
          <p className="tex-wrap text-white">
            Whether you&apos;re celebrating, gifting, or simply treating
            yourself, we have the perfect arrangement for every occasion.
            Explore our curated selection of bouquet types to find exactly what
            you&apos;re looking for.
          </p>
        </div>
      </section>

      <section className="relative container mx-auto flex h-max w-full flex-col items-center gap-2 p-20">
        <div>filter</div>
        <div>list item</div>
        <div>pagination</div>
      </section>

      <section
        className="relative flex h-[400px] max-h-[400px] min-w-screen flex-col items-center justify-center"
        data-aos-easing="ease-in-out-back"
        data-aos="fade-up"
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
        >
          <h3
            className="desktop-tablet__heading__h3 text-center !font-bold tracking-widest"
            data-aos-easing="ease-in-out-back"
            data-aos="fade-up"
          >
            GET 50 % OFF BY SUBSCRIBE <br /> TO OUR NEWSLETTER
          </h3>

          <div
            className="relative flex items-center gap-2 rounded-lg border border-white/20 p-2 focus-within:border-white"
            data-aos-easing="ease-in-out-back"
            data-aos="fade-up"
          >
            <Input
              type="email"
              className="h-max max-w-[200px] border-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="Your Email .."
            />
            <Button className="text-danger-500 hover:bg-danger-500 desktop-tablet__body-medium__medium bg-white !font-medium hover:text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
