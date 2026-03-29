"use client";

import { useSelector } from "react-redux";
import Iconify from "@/components/shared/iconify";
import LazyImage from "@/components/shared/lazyimage/LazyImage";
import { motion, AnimatePresence } from "framer-motion";
import { premiumTransition } from "@/utils/animations";

const Loader = ({ inline = false, loading = true }) => {
  const { data: settings } = useSelector((state) => state.adminSettings);

  const logoUrl = settings?.logo_url
    ? `${settings.logo_url}`
    : "/assets/logo.webp";

  if (inline) {
    return (
      <div className="flex items-center justify-center min-h-100 w-full animate-in fade-in duration-500">
        <Iconify
          icon="svg-spinners:180-ring-with-bg"
          width={40}
          className="text-primary"
        />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={premiumTransition}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-white/80 backdrop-blur-sm"
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Decorative Background Element */}
            <div className="absolute -inset-10 bg-primary/5 blur-3xl rounded-full" />

            {/* Animated Loader Container */}
            <motion.div
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <LazyImage
                src={logoUrl}
                alt="Loading..."
                className="w-37.5 h-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Spinner below logo */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
