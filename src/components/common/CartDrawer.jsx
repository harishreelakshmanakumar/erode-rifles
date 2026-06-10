"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "@/context/RouterContext";
import Button from "./Button";

export default function CartDrawer() {
  const { items, total, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const { navigate } = useRouter();

  const shipping = total >= 5000 ? 0 : 200;
  const grandTotal = total + shipping;

  const handleClose = () => setIsCartOpen(false);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const handleShopNow = () => {
    setIsCartOpen(false);
    navigate("/shop");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[70]">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-erode-black flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-erode-black" />
                <h2 className="font-heading text-xl font-bold text-erode-black tracking-wider">
                  YOUR CART
                </h2>
                {items.length > 0 && (
                  <span className="bg-erode-green text-erode-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-erode-black hover:text-erode-green transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Cart Content */}
            {items.length === 0 ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <ShoppingBag size={32} className="text-gray-300" />
                </div>
                <h3 className="font-heading text-2xl text-erode-black tracking-wider mb-2">
                  YOUR CART IS EMPTY
                </h3>
                <p className="text-sm text-gray-500 text-center mb-8">
                  Looks like you haven&apos;t added any products yet.
                  Browse our collection and find something you love.
                </p>
                <Button variant="primary" size="md" onClick={handleShopNow}>
                  Shop Now
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 border border-gray-200 rounded-lg"
                      >
                        {/* Item Image */}
                        <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-erode-black truncate">
                            {item.name}
                          </h4>
                          {item.category && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {item.category}
                            </p>
                          )}
                          <p className="text-sm font-bold text-erode-black mt-1">
                            {formatPrice(item.price)}
                          </p>

                          {/* Quantity Controls & Remove */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-erode-black rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.qty - 1)}
                                className="p-1 text-erode-black hover:bg-gray-100 transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-3 text-sm font-semibold text-erode-black min-w-[32px] text-center">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                className="p-1 text-erode-black hover:bg-gray-100 transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Footer */}
                <div className="flex-shrink-0 border-t border-erode-black px-6 py-5">
                  {/* Totals */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-semibold text-erode-black">
                        {formatPrice(total)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="font-semibold text-erode-black">
                        {shipping === 0 ? (
                          <span className="text-erode-green">FREE</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-gray-400">
                        Free shipping on orders above &#8377;5,000
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-base font-bold text-erode-black">Total</span>
                      <span className="text-base font-bold text-erode-black">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full mb-3"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  <button
                    onClick={handleClose}
                    className="w-full text-center text-sm font-medium text-erode-black hover:text-erode-green transition-colors cursor-pointer py-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
