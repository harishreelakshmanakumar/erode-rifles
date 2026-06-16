"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, MapPin, Phone, Mail } from "lucide-react";

export default function ReviewStep({ address, onNext, onBack }) {
  const { items, total } = useCart();
  const shipping = total >= 5000 ? 0 : 200;
  const grandTotal = total + shipping;

  return (
    <div className="max-w-3xl mx-auto rounded-3xl border border-gray-100 bg-white p-5 shadow-xl shadow-black/5 sm:p-7">
      <h2 className="font-heading text-3xl sm:text-4xl text-erode-black mb-6 leading-none">
        Review Your Order
      </h2>

      {/* Address */}
      <div className="border border-gray-100 rounded-2xl p-4 sm:p-5 bg-gray-50/70 mb-5">
        <h3 className="font-semibold text-erode-black text-sm mb-3 flex items-center gap-2">
          <MapPin size={16} className="text-erode-green" />
          Shipping Address
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-medium text-erode-black">{address.fullName}</p>
          <p className="flex items-center gap-1.5">
            <Phone size={12} className="text-gray-400" />
            {address.mobile}
          </p>
          <p className="flex items-center gap-1.5">
            <Mail size={12} className="text-gray-400" />
            {address.email}
          </p>
          <p>{address.address}</p>
          <p>{address.city}, {address.state} - {address.postalCode}</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="border border-gray-100 rounded-2xl overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="hidden sm:table-row bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium text-gray-500">Item</th>
              <th className="text-center px-4 py-3 font-medium text-gray-500">Qty</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="block sm:table-row border-b border-gray-50 last:border-b-0">
                <td className="block sm:table-cell px-4 pt-4 pb-2 sm:py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <span className="font-medium text-erode-black text-sm">{item.name}</span>
                  </div>
                </td>
                <td className="inline-block sm:table-cell px-4 pb-4 sm:py-3 text-gray-500 sm:text-center">
                  <span className="sm:hidden">Qty: </span>{item.qty}
                </td>
                <td className="inline-block float-right sm:float-none sm:table-cell px-4 pb-4 sm:py-3 font-medium text-right">
                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="border border-gray-100 rounded-2xl p-5 bg-white mb-6 shadow-sm">
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
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <span className="font-semibold text-erode-black">Total</span>
            <span className="font-bold text-lg text-erode-black">
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 sm:gap-4">
        <Button variant="outline" onClick={onBack} className="gap-2 h-12 px-6 rounded-xl border-gray-200">
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          onClick={() => onNext()}
          className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2 h-12 px-8 rounded-xl flex-1 sm:flex-none"
        >
          Continue to Payment
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
