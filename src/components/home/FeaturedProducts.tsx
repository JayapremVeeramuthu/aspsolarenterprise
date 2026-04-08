import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeUp } from "@/components/motion/Animations";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FeaturedProducts = () => {
  const featured = products.filter(p => p.stock > 0).slice(0, 8);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeUp className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Top-rated solar and electrical products from Andslite</p>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <FadeUp className="text-center mt-10">
          <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
            <Link to="/products">View All Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </FadeUp>
      </div>
    </section>
  );
};
