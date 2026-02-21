import Image from "next/image";
import Banner from "@/assets/Banner.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubscribeSection from "@/components/ShopSection/SubscribeSection";

export default function Page() {
  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center gap-2">
      <section className="flex max-w-7xl items-center justify-between gap-8 px-24 py-24">
        <div className="flex max-w-xl flex-col gap-2">
          <h1 className="desktop-tablet__heading__h2 !font-semibold text-black">
            Welcome to
          </h1>

          <h1 className="text-danger-500 desktop-tablet__heading__h2 !font-bold">
            Savirblossom
          </h1>

          <p className="desktop-tablet__body-xlarge__semibold text-grayscale-600 !font-semibold">
            Where every bouquet tells a story
          </p>

          <p className="desktop-tablet__body-xlarge__semibold text-grayscale-600">
            We believe flowers speak the language of the heart celebrating love,
            comfort, joy, and every meaningful moment in between.
          </p>

          <Button className="hover:text-primary w-max border border-black text-white transition-all hover:bg-white">
            Explore our bouquets →
          </Button>
        </div>

        <div className="relative h-[420px] w-[420px] overflow-hidden rounded-2xl">
          <Image src={Banner} alt="Bouquet" fill className="object-cover" />
        </div>
      </section>

      <section className="flex max-w-7xl items-center justify-between gap-8 px-24 py-24">
        <div className="relative h-[420px] w-[420px] overflow-hidden rounded-2xl">
          <Image
            src={Banner}
            alt="flower-store"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex max-w-xl flex-col gap-2">
          <h1 className="desktop-tablet__heading__h2 !font-semibold text-black">
            Our <span className="text-danger-500">Story</span>
          </h1>

          <p className="desktop-tablet__body-xlarge__semibold text-grayscale-600">
            <span className="text-danger-500">Savirblossom</span> began with a
            simple belief that flowers have the power to express what words
            sometimes cannot. What started as a small passion for arranging
            bouquets for loved ones grew into a mission to help people share
            emotions beautifully. Today, we carefully craft each bouquet to
            bring warmth, joy, and connection to every occasion.
          </p>
        </div>
      </section>

      <section className="flex max-w-7xl flex-col items-center justify-between gap-8 px-24 py-24">
        <h1 className="desktop-tablet__heading__h2 !font-semibold">
          Why We Do What We Do
        </h1>

        {/* TODO: Content need to come from backend */}
        <div className="flex w-full items-center justify-center gap-4">
          {[...Array(3)].map((_, index) => (
            <Card className="bg-grayscale-200 border-none" key={index}>
              <CardHeader className="relative h-[250px] w-full rounded-t-[inherit]">
                <Image
                  src={Banner}
                  alt="flower-card"
                  fill
                  className="rounded-t-[inherit] object-cover"
                />
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-3 p-4">
                <CardTitle>🌷 Handcrafted with Care</CardTitle>
                <CardDescription className="max-w-[250px] text-wrap">
                  Every bouquet is arranged by hand with attention to detail.
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex max-w-7xl flex-col items-center justify-between gap-8 px-24 py-24">
        <div className="relative h-[300px] w-[300px] rounded-full border-4 border-white shadow-md">
          <Image
            src={Banner}
            alt="Owner-photo"
            fill
            className="rounded-[inherit] object-cover"
          />
        </div>

        <h1 className="desktop-tablet__heading__h2 text-center !font-semibold">
          Meet the Heart Behind
          <br />
          <span className="text-danger-500">Savirblossom</span>
        </h1>

        <p className="desktop-tablet__body-xlarge__semibold text-grayscale-600 text-center">
          Savirblossom is built on passion, creativity, and love for bringing
          smiles to people&apos;s faces. Our small team of dedicated florists
          works with care to ensure every bouquet feels personal and
          unforgettable.
        </p>
      </section>

      <section className="flex max-w-7xl items-center justify-between gap-8 px-24 py-24">
        <div className="flex max-w-xl flex-col gap-4">
          <h1 className="desktop-tablet__heading__h2 !font-semibold text-black">
            What Makes Our Bouquets Special
          </h1>

          <ul className="desktop-tablet__body-xlarge__semibold text-grayscale-600 list-disc">
            <li>Carefully curated flower combinations</li>
            <li>Elegant wrapping and presentation</li>
            <li>Attention to every detail</li>
            <li>Designed for lasting impressions</li>
          </ul>
        </div>

        <div className="relative h-[420px] w-[420px] overflow-hidden rounded-2xl">
          <Image src={Banner} alt="Bouquet" fill className="object-cover" />
        </div>
      </section>

      <SubscribeSection />
    </main>
  );
}
