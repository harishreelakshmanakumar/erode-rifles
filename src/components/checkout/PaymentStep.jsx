"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  Smartphone,
  CreditCard,
  Building2,
  Banknote,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const paymentMethods = [
  { id: "upi", label: "UPI", icon: Smartphone, desc: "Pay via UPI (GPay, PhonePe, etc.)" },
  { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", icon: Building2, desc: "All major banks supported" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when you receive" },
];

export default function PaymentStep({ onPlaceOrder }) {
  const [selected, setSelected] = useState("upi");
  const [placing, setPlacing] = useState(false);
  const { total } = useCart();

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      onPlaceOrder();
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto rounded-3xl border border-gray-100 bg-white p-5 shadow-xl shadow-black/5 sm:p-7">
      <h2 className="font-heading text-3xl sm:text-4xl text-erode-black mb-2 leading-none">
        Payment Method
      </h2>
      <p className="mb-6 text-sm text-erode-black/50">
        Choose a payment option to finish your order.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {paymentMethods.map((method, index) => {
          const Icon = method.icon;
          const isActive = selected === method.id;

          return (
            <motion.button
              key={method.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => setSelected(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                isActive
                  ? "border-erode-green bg-erode-green/10 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:-translate-y-0.5"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActive ? "bg-erode-green" : "bg-gray-100"
                }`}
              >
                <Icon
                  className={`size-5 ${
                    isActive ? "text-erode-black" : "text-gray-500"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-erode-black text-sm">
                  {method.label}
                </p>
                <p className="text-xs text-gray-500">{method.desc}</p>
              </div>
              {isActive ? (
                <CheckCircle2 className="size-5 text-erode-green" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Order Total */}
      <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Order Total</span>
          <span className="font-bold text-lg text-erode-black">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <Button
        onClick={handlePlaceOrder}
        disabled={placing}
        className="w-full bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold h-12 text-base rounded-xl"
      >
        {placing ? (
          <span className="flex items-center gap-2">
            <span className="size-5 border-2 border-erode-black/30 border-t-erode-black rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          "Place Order"
        )}
      </Button>
    </div>
  );
}
