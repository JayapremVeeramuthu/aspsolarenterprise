import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/919876543210?text=Hi, I'm interested in your solar products"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 2, type: "spring" }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-solar-green flex items-center justify-center shadow-lg"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6" style={{ color: "hsl(0 0% 100%)" }} />
  </motion.a>
);
