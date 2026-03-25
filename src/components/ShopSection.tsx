"use client";

import { cn, priceFormatter, scrollToTop } from "@/lib/utils";
import { Button } from "./ui/button";
// import { ListShopFilter, ListShopItem } from "@/lib/utils/constants";
import React from "react";
import {
  ShopSectionProvider,
  useShopSectionprovider,
} from "./ShopSection/ShopSectionProvider";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useBouquets, useCategories } from "@/services/bouquet";
import { useAddToCart } from "@/services/cart";
import { Spinner } from "phosphor-react";
import { useCartContext } from "@/contexts/CartContext";

export default function ShopSection() {
  const { data } = useCategories();

  const [selectedFilter, setSelectedFilter] = React.useState<
    number | undefined
  >(data?.data[0]?.id);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data: bouquet, isLoading: isBouquetLoading } = useBouquets({
    categoryId: selectedFilter,
    page: currentPage,
  });

  React.useEffect(() => {
    if (data && data.data.length > 0) setSelectedFilter(data.data[0].id);
  }, [data]);

  const lastPage = bouquet?.meta.last_page ?? 1;

  return (
    <ShopSectionProvider.Provider
      value={{
        selectedFilter,
        currentPage,
        bouquetList: bouquet?.data,
        isBouquetLoading,
      }}
    >
      <section className="relative container mx-auto flex h-max w-full flex-col items-center gap-8 p-20">
        <div className="container">
          <ul className="flex w-full items-center justify-center gap-4">
            {data?.data.map((item, index) => (
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
                    setSelectedFilter(item.id);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "border-grayscale-400 hover:bg-danger-500 desktop-tablet__body-large__semibold hover:border-danger-500 rounded-full border bg-white font-semibold hover:text-white",
                    selectedFilter === item.id &&
                      "bg-danger-500 border-danger-500 hover:border-grayscale-400 text-white hover:bg-white hover:text-black",
                  )}
                >
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <ShopItems />
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={(page) =>
            scrollToTop({
              onComplete: () => setCurrentPage(page),
            })
          }
        />
      </section>
    </ShopSectionProvider.Provider>
  );
}

function ShopItems() {
  const { bouquetList, isBouquetLoading } = useShopSectionprovider();
  const addToCartMutation = useAddToCart();
  const { items } = useCartContext();

  if (isBouquetLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-full flex h-[400px] items-center justify-center">
          <Spinner
            size={36}
            weight="bold"
            className="text-grayscale-400 animate-spin"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {bouquetList?.map((item, index) => {
        const isOnCart = items.some(
          (cartItem) => cartItem.bouquet_id === item.id,
        );
        return (
          <ProductCard
            isOnCart={isOnCart}
            disableClick={isOnCart}
            data-aos-delay={50 * (index + 1)}
            data-aos-easing="ease-in-out-back"
            data-aos="fade-in"
            title={item.name}
            price={priceFormatter(Number(item.price))}
            isNewArrival={item.category?.name.toLowerCase().includes("new")}
            key={`${item.name}-${index}`}
            image={item.galleries?.[0]?.src || ""}
            onCartClick={(e) => {
              e.preventDefault();
              addToCartMutation.mutate({
                bouquet_id: item.id,
                quantity: 1,
              });
            }}
          />
        );
      })}
    </div>
  );
}
