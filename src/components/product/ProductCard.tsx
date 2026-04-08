import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";

export const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group bg-card rounded-xl border border-border overflow-hidden transition-shadow hover:shadow-[var(--shadow-hover)]"
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
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card">
          <Heart className="w-4 h-4" />
        </button>
      </Link>

      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.subcategory}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-display font-bold text-lg">
            {product.price ? `₹${product.price.toLocaleString()}` : "Contact Us"}
          </span>
          <Button
            size="sm"
            onClick={(e) => { e.preventDefault(); if (product.stock > 0 && product.price) addItem(product); }}
            disabled={product.stock === 0 || !product.price}
            className="bg-solar-gradient text-primary-foreground hover:opacity-90 h-8 px-3"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
