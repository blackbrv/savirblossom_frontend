"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ListShopFilter, ListShopItem } from "@/lib/utils/constants";
import React from "react";
import {
  ShopSectionProvider,
  useShopSectionprovider,
} from "./ShopSection/ShopSectionProvider";
import { Badge } from "./ui/badge";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import Pagination from "./Pagination";

export default function ShopSection() {
  const [selectedFilter, setSelectedFilter] = React.useState("new_arrival");

  return (
    <ShopSectionProvider.Provider
      value={{
        selectedFilter,
      }}
    >
      <section className="relative container mx-auto flex h-max w-full flex-col items-center gap-8 p-20">
        <div className="container">
          <ul className="flex w-full items-center justify-center gap-4">
            {ListShopFilter.map((item, index) => (
              <li
                key={index}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={100 * index}
                data-aos-easing="ease-in-out-back"
              >
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedFilter(item.value);
                  }}
                  className={cn(
                    "border-grayscale-400 hover:bg-danger-500 desktop-tablet__body-large__semibold hover:border-danger-500 rounded-full border bg-white font-semibold hover:text-white",
                    selectedFilter === item.value &&
                      "bg-danger-500 border-danger-500 hover:border-grayscale-400 text-white hover:bg-white hover:text-black",
                  )}
                >
                  {item.title}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <ShopItems />
        <Pagination />
      </section>
    </ShopSectionProvider.Provider>
  );
}

function ShopItems() {
  const { selectedFilter } = useShopSectionprovider();

  const currentlyShowedItems = React.useMemo(() => {
    return ListShopItem.find((item) => item.type === selectedFilter)?.items;
  }, [selectedFilter]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {currentlyShowedItems?.map((item, index) => {
        return (
          <div
            className="border-grayscale-400 flex w-full flex-col items-center gap-4 rounded-md border bg-white p-4"
            key={`${item.title}-${index}`}
            data-aos="fade-up"
            data-aos-delay={100 * index}
          >
            <div className="relative h-max w-full rounded-[inherit]">
              <Image
                src={item.galleries?.[0].src || ""}
                alt={item.galleries?.[0].alt_text || ""}
                width={1280}
                height={720}
                className="border-grayscale-200 h-48 w-full rounded-[inherit] border object-cover"
              />
              {selectedFilter === "new_arrival" && (
                <Badge className="bg-danger-500 hover:bg-danger-500 absolute top-2 left-2 rounded-sm text-white">
                  New
                </Badge>
              )}
            </div>
            <span>{item.title}</span>
          </div>
        );
      })}
    </div>
  );
}
