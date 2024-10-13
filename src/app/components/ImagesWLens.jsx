"use client";
import React from "react";
import Image from "next/image";
import { Lens } from "./ui/lens";

const ImagesWLens = ({
  where,
  className,
  altImgName = "Savirblossom",
  cusRounded,
}) => {
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
