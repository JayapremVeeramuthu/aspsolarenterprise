import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { sendToWhatsApp, generateCartMessage } from "@/utils/whatsapp";

export const CartDrawer = () => {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const totalPrice = total();
  const handleOrderViaWhatsApp = () => {
    const cartItemsForMsg = items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));
    const msg = generateCartMessage(cartItemsForMsg, totalPrice);
    sendToWhatsApp(msg);
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-800 shadow-md z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="font-display font-bold text-lg flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-400/30" />
                  </div>
                  <p className="text-gray-400 font-medium">Your cart is empty</p>
                  <p className="text-sm text-gray-400/70 text-center">Browse our products and add items to your cart</p>
                  <Button onClick={() => setOpen(false)} asChild className="bg-solar-gradient text-primary-foreground hover:opacity-90">
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div key={item.product.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                          className="flex gap-4 p-3 rounded-lg bg-muted/50"
                        >
                          <Link to={`/product/${item.product.id}`} onClick={() => setOpen(false)} className="flex-shrink-0">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg hover:opacity-80 transition-opacity" loading="lazy" />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${item.product.id}`} onClick={() => setOpen(false)}>
                              <h4 className="text-sm font-medium truncate hover:text-primary transition-colors">{item.product.name}</h4>
                            </Link>
                            <p className="text-sm text-primary font-semibold">
                              {item.product.price ? `₹${item.product.price.toLocaleString()}` : "Contact for price"}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm w-6 text-center font-medium">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                                <Plus className="w-3 h-3" />
                              </button>
                              <button onClick={() => removeItem(item.product.id)} className="ml-auto w-6 h-6 rounded flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <div className="p-6 border-t border-gray-700 space-y-4">
                    <div className="flex justify-between text-lg font-display font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <Button
                      onClick={handleOrderViaWhatsApp}
                      className="w-full h-14 bg-green-500 text-white hover:bg-green-400 text-white text-base font-bold shadow-[0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_0_35px_rgba(37,211,102,0.45)] transition-all duration-300 rounded-xl"
                      size="lg"
                    >
                      <WhatsAppIcon className="w-5 h-5 mr-2" />
                      Order via WhatsApp ({items.length} {items.length === 1 ? 'item' : 'items'})
                    </Button>
                    <Button variant="ghost" className="w-full text-sm text-gray-400 hover:text-destructive" onClick={clearCart}>
                      <Trash2 className="w-3.5 h-3.5 mr-2" /> Clear Cart
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </>
  );
};
