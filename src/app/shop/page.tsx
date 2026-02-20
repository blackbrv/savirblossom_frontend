import Image from "next/image";
import ShopBackground from "@/assets/colourful-flowers-3840x2160-4k-hd-wallpaper-flowers-10299 1 (1).png";
import SubscribeSection from "@/components/ShopSection/SubscribeSection";
import ShopSection from "@/components/ShopSection";

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
      <ShopSection />
      <SubscribeSection animateOnce />
    </main>
  );
}
