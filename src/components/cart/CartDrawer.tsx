import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CartDrawer = () => {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const totalPrice = total();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display font-bold text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Cart ({items.length})
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button onClick={() => setOpen(false)} asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <motion.div key={item.product.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                        <p className="text-sm text-primary font-semibold">
                          {item.product.price ? `₹${item.product.price.toLocaleString()}` : "Contact for price"}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => removeItem(item.product.id)} className="ml-auto text-destructive text-xs hover:underline">Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex justify-between text-lg font-display font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <Button className="w-full bg-solar-gradient text-primary-foreground hover:opacity-90" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Button variant="ghost" className="w-full text-sm" onClick={clearCart}>Clear Cart</Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
