import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/motion/Animations";
import { Star, ArrowLeft, Heart, Truck, Shield, RotateCcw, ShoppingCart, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { sendToWhatsApp, generateSingleProductMessage } from "@/utils/whatsapp";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(s => s.addItem);
  const [activeTab, setActiveTab] = useState("description");
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { toast } = useToast();

  if (!product) return (
    <div className="pt-24 pb-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <ShoppingCart className="w-8 h-8 text-gray-400/50" />
      </div>
      <h2 className="font-display text-2xl font-bold mb-2">Product Not Found</h2>
      <p className="text-gray-400 mb-6">Sorry, we couldn't find the product you're looking for.</p>
      <Button asChild className="bg-solar-gradient text-primary-foreground hover:opacity-90">
        <Link to="/products">Browse Products</Link>
      </Button>
    </div>
  );

  const handleBuyViaWhatsApp = () => {
    if (!product) return;
    const msg = generateSingleProductMessage(product.name, product.price, qty, window.location.href);
    sendToWhatsApp(msg);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAddedToCart(true);
    toast({
      title: "Added to Cart!",
      description: `${qty}x ${product.name} added to your cart.`,
    });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const tabs = ["description", "specifications", "reviews"];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <FadeUp>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-10">
          <FadeUp>
            <ProductImageGallery images={product.images} productName={product.name} />
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
                <span className="text-sm text-gray-400">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="font-display text-3xl font-bold">
                {product.price ? `₹${product.price.toLocaleString()}` : "Contact for Price"}
              </div>

              <p className="text-gray-400 leading-relaxed">{product.description}</p>

              <div className="flex flex-wrap gap-2">
                {product.features.map(f => (
                  <span key={f} className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium">{f}</span>
                ))}
              </div>

              {product.stock > 0 && (
                <div className="space-y-3 pt-4">
                  {/* Stock indicator */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-600 text-green-400 font-medium">In Stock ({product.stock} available)</span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-700 rounded-lg">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-muted transition-colors">-</button>
                      <span className="px-4 py-2 border-x border-gray-700 font-medium">{qty}</span>
                      <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 hover:bg-muted transition-colors">+</button>
                    </div>
                    <Button variant="outline" size="icon" className="h-12 w-12"><Heart className="w-5 h-5" /></Button>
                  </div>

                  {/* WhatsApp Order Button - PRIMARY */}
                  <Button
                    onClick={handleBuyViaWhatsApp}
                    className="w-full h-14 bg-green-500 text-white hover:bg-green-400 text-white text-base font-bold shadow-[0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_0_35px_rgba(37,211,102,0.45)] transition-all duration-300 rounded-xl"
                    size="lg"
                  >
                    <WhatsAppIcon className="w-5 h-5 mr-2" />
                    Buy Now via WhatsApp
                  </Button>

                  {/* Add to Cart - SECONDARY */}
                  {product.price && (
                    <Button
                      onClick={handleAddToCart}
                      variant="outline"
                      className={`w-full h-12 transition-all duration-300 ${addedToCart ? 'bg-green-50 border-green-300 text-green-700 bg-green-950 border-green-700 text-green-400' : ''}`}
                      size="lg"
                      disabled={addedToCart}
                    >
                      {addedToCart ? (
                        <><Check className="w-5 h-5 mr-2" /> Added to Cart!</>
                      ) : (
                        <><ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart</>
                      )}
                    </Button>
                  )}
                </div>
              )}

              {product.stock === 0 && (
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-sm text-destructive font-medium">Currently Out of Stock</span>
                  </div>
                  {/* Still allow WhatsApp inquiry for out-of-stock */}
                  <Button
                    onClick={() => {
                      const message = `Hello, I'm interested in the "${product.name}" which appears to be out of stock.\n\n🖼 Product Image:\n${product.images[0]}\n\n🔗 Link: ${window.location.href}\n\nCould you let me know when it will be available?`;
                      sendToWhatsApp(message);
                    }}
                    className="w-full h-12 bg-green-500 text-white hover:bg-green-400 text-white font-semibold shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300 rounded-xl"
                    size="lg"
                  >
                    <WhatsAppIcon className="w-5 h-5 mr-2" />
                    Enquire on WhatsApp
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
                {[{ icon: Truck, text: "Free Shipping" }, { icon: Shield, text: "1 Year Warranty" }, { icon: RotateCcw, text: "Easy Returns" }].map(f => (
                  <div key={f.text} className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-gray-400">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Tabs */}
        <FadeUp delay={0.3} className="mt-16">
          <div className="flex gap-1 border-b border-gray-700 mb-8">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-[1px] ${
                  activeTab === tab ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-100"
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && <p className="text-gray-400 leading-relaxed max-w-3xl">{product.description}</p>}
          {activeTab === "specifications" && (
            <div className="max-w-lg">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-gray-700 text-sm">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="max-w-2xl">
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <div className="font-display text-4xl font-bold text-primary">{product.rating}</div>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{product.reviews} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map(star => {
                    const percentage = star === Math.round(product.rating) ? 60 : star > product.rating ? 5 : Math.max(5, 30 - (Math.round(product.rating) - star) * 10);
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-3">{star}</span>
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-gray-400 text-sm">Customer reviews feature is coming soon. Contact us via WhatsApp to share your experience!</p>
            </div>
          )}
        </FadeUp>

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />
      </div>


    </div>
  );
};

export default ProductDetail;
