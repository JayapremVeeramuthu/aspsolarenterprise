import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const goTo = (index: number) => {
    if (index >= 0 && index < images.length) setActiveIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative bg-muted/50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center group cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${productName} - Image ${activeIndex + 1}`}
            className="max-w-full max-h-full object-contain p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gray-800/80 shadow-md backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-5 h-5 text-gray-100/70" />
        </div>

        {/* Navigation arrows (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
              disabled={activeIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800/80 shadow-md backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-gray-800 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
              disabled={activeIndex === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800/80 shadow-md backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-gray-800 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gray-800/80 shadow-md backdrop-blur text-xs font-medium text-gray-100/70">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex
                  ? "border-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                  : "border-gray-700 hover:border-primary/50 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`${productName} - Thumbnail ${i + 1}`}
                className="w-full h-full object-contain p-1"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox/Zoom modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-foreground/90 backdrop-blur-xl flex items-center justify-center cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              src={images[activeIndex]}
              alt={productName}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
            {/* Close hint */}
            <div className="absolute top-6 right-6 text-white/60 text-sm font-medium">
              Click anywhere to close
            </div>
            {/* Navigation in zoom mode */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
                  disabled={activeIndex === 0}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/10 backdrop-blur flex items-center justify-center hover:bg-gray-800/20 transition-colors disabled:opacity-30"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
                  disabled={activeIndex === images.length - 1}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/10 backdrop-blur flex items-center justify-center hover:bg-gray-800/20 transition-colors disabled:opacity-30"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
