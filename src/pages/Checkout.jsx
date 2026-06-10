"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "@/context/RouterContext";
import StepIndicator from "@/components/checkout/StepIndicator";
import AddressStep from "@/components/checkout/AddressStep";
import ReviewStep from "@/components/checkout/ReviewStep";
import PaymentStep from "@/components/checkout/PaymentStep";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  const { items, count, clearCart } = useCart();
  const { navigate } = useRouter();
  const [step, setStep] = useState(0); // 0=Address, 1=Review, 2=Payment, 3=Success
  const [address, setAddress] = useState(null);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      navigate("/shop");
    }
  }, [items, step, navigate]);

  if (items.length === 0 && step !== 3) return null;

  const handleAddressNext = (addr) => {
    setAddress(addr);
    setStep(1);
  };

  const handleReviewNext = () => {
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const id = `ER-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`;
    setOrderId(id);
    clearCart();
    setStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <StepIndicator currentStep={step} />

      {/* Address Step */}
      {step === 0 && <AddressStep onNext={handleAddressNext} />}

      {/* Review Step */}
      {step === 1 && (
        <ReviewStep
          address={address}
          onNext={handleReviewNext}
          onBack={() => setStep(0)}
        />
      )}

      {/* Payment Step */}
      {step === 2 && <PaymentStep onPlaceOrder={handlePlaceOrder} />}

      {/* Success Step */}
      {step === 3 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-erode-green rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="size-10 text-erode-black" />
          </div>
          <h1 className="font-heading text-4xl text-erode-black mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 text-lg mb-2">
            Your order has been confirmed.
          </p>
          <p className="text-erode-black font-semibold text-lg mb-8">
            Order ID: {orderId}
          </p>
          <Button
            onClick={() => navigate("/shop")}
            className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2 h-12 px-8"
          >
            <ShoppingBag className="size-5" />
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}
