import GetInTouchForm from "@/components/Forms/GetInTouchForm";

export default function Page() {
  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center gap-2">
      <section className="flex max-w-7xl items-center justify-between gap-24 p-24">
        <div className="flex max-w-xl flex-col gap-2">
          <h5 className="desktop-tablet__heading__h5 !font-medium text-black">
            We&apos;re so glad you&apos;re here.
          </h5>

          <h1 className="text-danger-500 desktop-tablet__heading__h2 !font-bold capitalize">
            Let us help you.
          </h1>

          <p className="desktop-tablet__body-xlarge__semibold text-grayscale-black text-wrap">
            Whether you have a unique idea for a bouquet or just a few
            questions, this form is for you. We pour our heart into every
            handcrafted bouquet we create, and we&apos;re always excited to work
            with you on something truly special. So, whether you&apos;re looking
            for a specific arrangement, a quote for an order, or simply want to
            say hello, we&apos;re ready to listen and help make your idea
            happen.
          </p>
        </div>

        <GetInTouchForm />
      </section>
    </main>
  );
}
