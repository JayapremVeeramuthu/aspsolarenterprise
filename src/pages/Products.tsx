import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeUp } from "@/components/motion/Animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "all") result = result.filter(p => p.category === selectedCategory);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "price-low") result.sort((a, b) => (a.price || 99999) - (b.price || 99999));
    if (sortBy === "price-high") result.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedCategory, search, sortBy]);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <FadeUp className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Browse our complete range of {products.length} products</p>
        </FadeUp>

        <FadeUp delay={0.1} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant={selectedCategory === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-solar-gradient text-primary-foreground" : ""}>All</Button>
            {categories.map(c => (
              <Button key={c.id} variant={selectedCategory === c.slug ? "default" : "outline"} size="sm"
                onClick={() => setSelectedCategory(c.slug)}
                className={selectedCategory === c.slug ? "bg-solar-gradient text-primary-foreground" : ""}>
                {c.name}
              </Button>
            ))}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-sm">
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </FadeUp>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No products found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
