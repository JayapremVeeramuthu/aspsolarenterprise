import { products, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { FadeUp } from "@/components/motion/Animations";

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const related = products
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category && p.stock > 0)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <FadeUp delay={0.4} className="mt-20">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {related.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </FadeUp>
  );
};
