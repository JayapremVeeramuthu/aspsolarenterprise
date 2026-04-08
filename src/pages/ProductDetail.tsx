import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/Animations";
import { ShoppingCart, Star, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(s => s.addItem);
  const [activeTab, setActiveTab] = useState("description");
  const [qty, setQty] = useState(1);

  if (!product) return (
    <div className="pt-24 pb-16 text-center">
      <p className="text-muted-foreground">Product not found.</p>
      <Button asChild className="mt-4"><Link to="/products">Back to Products</Link></Button>
    </div>
  );

  const tabs = ["description", "specifications", "reviews"];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <FadeUp>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-10">
          <FadeUp>
            <div className="bg-muted/50 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <motion.img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="space-y-5">
              <p className="text-sm text-primary font-medium uppercase tracking-wider">{product.subcategory}</p>
              <h1 className="font-display text-2xl md:text-3xl font-bold">{product.name}</h1>

              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="font-display text-3xl font-bold">
                {product.price ? `₹${product.price.toLocaleString()}` : "Contact for Price"}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="flex flex-wrap gap-2">
                {product.features.map(f => (
                  <span key={f} className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium">{f}</span>
                ))}
              </div>

              {product.price && product.stock > 0 && (
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-muted transition-colors">-</button>
                    <span className="px-4 py-2 border-x border-border">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-muted transition-colors">+</button>
                  </div>
                  <Button onClick={() => { for (let i = 0; i < qty; i++) addItem(product); }}
                    className="bg-solar-gradient text-primary-foreground hover:opacity-90 flex-1 h-12" size="lg">
                    <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 w-12"><Heart className="w-5 h-5" /></Button>
                </div>
              )}

              {product.stock === 0 && (
                <div className="px-4 py-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">Currently out of stock</div>
              )}

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {[{ icon: Truck, text: "Free Shipping" }, { icon: Shield, text: "1 Year Warranty" }, { icon: RotateCcw, text: "Easy Returns" }].map(f => (
                  <div key={f.text} className="flex flex-col items-center gap-1 text-center">
                    <f.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Tabs */}
        <FadeUp delay={0.3} className="mt-16">
          <div className="flex gap-1 border-b border-border mb-8">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-[1px] ${
                  activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && <p className="text-muted-foreground leading-relaxed max-w-3xl">{product.description}</p>}
          {activeTab === "specifications" && (
            <div className="max-w-lg">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-border text-sm">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "reviews" && (
            <p className="text-muted-foreground">Reviews feature coming soon. This product has {product.reviews} reviews with an average rating of {product.rating}/5.</p>
          )}
        </FadeUp>
      </div>
    </div>
  );
};

export default ProductDetail;
