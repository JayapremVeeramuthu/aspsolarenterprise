import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="https://wa.me/919003028001?text=Hi%2C%20I%27m%20interested%20in%20your%20solar%20products"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-green-500 text-white px-4 py-3 shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-shadow duration-300"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6 text-white flex-shrink-0" />
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-white font-semibold text-sm whitespace-nowrap overflow-hidden"
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
};
