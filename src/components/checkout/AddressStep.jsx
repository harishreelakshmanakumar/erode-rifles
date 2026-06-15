"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AddressStep({ onNext }) {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.mobile.trim()) errs.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.mobile.replace(/\D/g, ""))) errs.mobile = "Enter a valid 10-digit mobile number";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    if (!form.postalCode.trim()) errs.postalCode = "Postal code is required";
    else if (!/^\d{6}$/.test(form.postalCode)) errs.postalCode = "Enter a valid 6-digit postal code";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onNext(form);
    }
  };

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-heading text-2xl text-erode-black mb-2">
        Shipping Address
      </h2>
      <p className="text-sm text-erode-black/50 mb-6">
        Enter your complete delivery address
      </p>
      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="full-name">Full Name *</Label>
          <Input
            id="full-name"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Enter your full name"
            className={errors.fullName ? "border-red-300 focus:border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Mobile & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              type="tel"
              value={form.mobile}
              onChange={(e) => updateField("mobile", e.target.value)}
              placeholder="9876543210"
              maxLength={10}
              className={errors.mobile ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.mobile && (
              <p className="text-xs text-red-500">{errors.mobile}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              className={errors.email ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address">Complete Address *</Label>
          <Input
            id="address"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="House/Flat No., Street Name, Landmark"
            className={errors.address ? "border-red-300 focus:border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-xs text-red-500">{errors.address}</p>
          )}
        </div>

        {/* City, State, Postal Code */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Erode"
              className={errors.city ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.city && (
              <p className="text-xs text-red-500">{errors.city}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
              placeholder="Tamil Nadu"
              className={errors.state ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.state && (
              <p className="text-xs text-red-500">{errors.state}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code *</Label>
            <Input
              id="postalCode"
              value={form.postalCode}
              onChange={(e) => updateField("postalCode", e.target.value)}
              placeholder="638012"
              maxLength={6}
              className={errors.postalCode ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.postalCode && (
              <p className="text-xs text-red-500">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleContinue}
            className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2 h-12 px-8 rounded-xl w-full sm:w-auto"
          >
            Continue to Review
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
