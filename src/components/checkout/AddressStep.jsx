"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AddressStep({ onNext }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.fullName) errs.fullName = "Required";
    if (!form.phone) errs.phone = "Required";
    if (!form.address1) errs.address1 = "Required";
    if (!form.city) errs.city = "Required";
    if (!form.state) errs.state = "Required";
    if (!form.pincode) errs.pincode = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onNext(form);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-heading text-2xl text-erode-black mb-6">
        Shipping Address
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Rahul Kumar"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="addr-phone">Phone</Label>
            <Input
              id="addr-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 9876543210"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address1">Address Line 1</Label>
          <Input
            id="address1"
            value={form.address1}
            onChange={(e) => setForm({ ...form, address1: e.target.value })}
            placeholder="House/Flat No., Street Name"
          />
          {errors.address1 && (
            <p className="text-xs text-red-500">{errors.address1}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address2">Address Line 2</Label>
          <Input
            id="address2"
            value={form.address2}
            onChange={(e) => setForm({ ...form, address2: e.target.value })}
            placeholder="Landmark, Area (optional)"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Erode"
            />
            {errors.city && (
              <p className="text-xs text-red-500">{errors.city}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              placeholder="Tamil Nadu"
            />
            {errors.state && (
              <p className="text-xs text-red-500">{errors.state}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              placeholder="638012"
            />
            {errors.pincode && (
              <p className="text-xs text-red-500">{errors.pincode}</p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleContinue}
            className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2"
          >
            Continue to Review
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
