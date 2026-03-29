"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Iconify from "../iconify";
import { cn } from "@/lib/utils";

const LazyImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  style,
  placeholderClassName,
  loaderSize = 40,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${wrapperClassName || "relative"}`} style={style}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-gray-50/50 backdrop-blur-[2px] z-10",
              placeholderClassName,
            )}
          >
            <Iconify
              icon="svg-spinners:180-ring-with-bg"
              width={loaderSize}
              className="text-primary/40"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        src={src}
        alt={alt}
        className={`block ${className || ""}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
