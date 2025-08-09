"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// @ts-expect-error: AOS is not typed
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

export default function AosProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [client] = useState(() => new QueryClient());

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      anchorPlacement: "top-bottom",
      offset: 120,
      delay: 100,
      throttleDelay: 99,
    });
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
