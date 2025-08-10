"use client";

import React from "react";

const useScrollListener = () => {
  const [isScroll, setIsScroll] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return { isScroll };
};

export default useScrollListener;
