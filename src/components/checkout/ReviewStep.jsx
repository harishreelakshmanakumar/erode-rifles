"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function ReviewStep({ address, onNext, onBack }) {
  const { items, total } = useCart();
  const shipping = total >= 5000 ? 0 : 199;
  const grandTotal = total + shipping;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-heading text-2xl text-erode-black mb-6">
        Review Your Order
      </h2>

      {/* Address */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white mb-6">
        <h3 className="font-semibold text-erode-black text-sm mb-2">
          Shipping Address
        </h3>
        <p className="text-sm text-gray-600">
          {address.fullName}<br />
          {address.phone}<br />
          {address.address1}
          {address.address2 && `, ${address.address2}`}<br />
          {address.city}, {address.state} - {address.pincode}
        </p>
      </div>

      {/* Cart Items */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-500">Item</th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">Qty</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <span className="font-medium text-erode-black">{item.name}</span>
                  </div>
                </td>
                <td className="text-center px-4 py-3">{item.qty}</td>
                <td className="text-right px-4 py-3">
                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-erode-black">₹{total.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span className={shipping === 0 ? "text-erode-green font-medium" : "text-erode-black"}>
              {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString("en-IN")}`}
            </span>
          </div>
          {shipping > 0 && (
            <p className="text-xs text-gray-400">
              Free shipping on orders above ₹5,000
            </p>
          )}
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="font-semibold text-erode-black">Total</span>
            <span className="font-bold text-lg text-erode-black">
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          onClick={() => onNext()}
          className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2"
        >
          Continue to Payment
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
