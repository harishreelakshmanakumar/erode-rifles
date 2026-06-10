"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  Smartphone,
  CreditCard,
  Building2,
  Banknote,
} from "lucide-react";

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
    <div className="max-w-lg mx-auto">
      <h2 className="font-heading text-2xl text-erode-black mb-6">
        Payment Method
      </h2>

      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isActive = selected === method.id;

          return (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-colors text-left ${
                isActive
                  ? "border-erode-green bg-erode-green/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
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
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isActive ? "border-erode-green" : "border-gray-300"
                }`}
              >
                {isActive && (
                  <div className="w-2.5 h-2.5 rounded-full bg-erode-green" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Order Total */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white mb-6">
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
        className="w-full bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold h-12 text-base"
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
