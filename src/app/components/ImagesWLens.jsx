"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Lens } from "./ui/lens";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

const ImagesWLens = ({
  where,
  className,
  altImgName = "Savirblossom",
  cusRounded,
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <>
      <div className={className}>
        <Lens>
          <Image
            src={where}
            className={`${cusRounded} rounded-xl relative z-10`}
            alt={altImgName}
          />
        </Lens>
      </div>
    </>
  );
};

export default ImagesWLens;
