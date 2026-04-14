import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { sendToWhatsApp, generateSingleProductMessage } from "@/utils/whatsapp";
import { useToast } from "@/hooks/use-toast";

export const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const addItem = useCartStore((s) => s.addItem);
  const [addedToCart, setAddedToCart] = useState(false);
  const { toast } = useToast();

  const handleBuyViaWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = generateSingleProductMessage(product.name, product.price, 1, `${window.location.origin}/product/${product.id}`);
    sendToWhatsApp(msg);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock > 0 && product.price) {
      addItem(product);
      setAddedToCart(true);
      toast({
        title: "Added to Cart!",
        description: `${product.name} added to your cart.`,
      });
      setTimeout(() => setAddedToCart(false), 1500);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        whileHover={{ y: -4 }}
        className="group bg-gray-800 shadow-md rounded-xl border border-gray-700 overflow-hidden transition-shadow hover:shadow-[var(--shadow-hover)]"
      >
        <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
              {product.badge}
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
              <span className="px-4 py-2 rounded-full bg-foreground/80 text-background text-xs font-bold uppercase tracking-wider">Out of Stock</span>
            </div>
          )}
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-800/80 shadow-md backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-800 shadow-md">
            <Heart className="w-4 h-4" />
          </button>
        </Link>

        <div className="p-4 space-y-2">
          <p className="text-xs text-gray-400 uppercase tracking-wider">{product.subcategory}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`} />
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="font-display font-bold text-lg">
              {product.price ? `₹${product.price.toLocaleString()}` : "Contact Us"}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !product.price || addedToCart}
              className={`h-8 px-3 transition-all duration-300 ${
                addedToCart
                  ? "bg-green-500 hover:bg-green-500 text-white"
                  : "bg-solar-gradient text-primary-foreground hover:opacity-90"
              }`}
            >
              {addedToCart ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <><ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add</>
              )}
            </Button>
          </div>

          {/* WhatsApp Buy Now Button */}
          <Button
            size="sm"
            onClick={handleBuyViaWhatsApp}
            className="w-full h-9 bg-green-500 text-white hover:bg-green-400 text-white font-semibold shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            Buy on WhatsApp
          </Button>
        </div>
      </motion.div>


    </>
  );
};
