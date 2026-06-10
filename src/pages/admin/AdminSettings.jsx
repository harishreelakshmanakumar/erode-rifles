"use client";

import { useState } from "react";
import { storeInfo } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, CheckCircle } from "lucide-react";

export default function AdminSettings() {
  const [form, setForm] = useState({
    siteName: "Erode Rifles",
    phone: storeInfo.phone1,
    email: storeInfo.email,
    address: storeInfo.address,
    instagram: "https://instagram.com/eroderifles",
    youtube: "https://youtube.com/@eroderifles",
    facebook: "https://facebook.com/eroderifles",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h2 className="font-heading text-2xl text-erode-black mb-6">Settings</h2>

      <div className="max-w-2xl space-y-4">
        <div className="space-y-2">
          <Label htmlFor="site-name">Site Name</Label>
          <Input
            id="site-name"
            value={form.siteName}
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="settings-phone">Phone</Label>
            <Input
              id="settings-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-email">Email</Label>
            <Input
              id="settings-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="settings-address">Address</Label>
          <Input
            id="settings-address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-erode-black mb-4">Social Links</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube URL</Label>
              <Input
                id="youtube"
                value={form.youtube}
                onChange={(e) => setForm({ ...form, youtube: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={form.facebook}
                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleSave}
            className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2"
          >
            {saved ? (
              <>
                <CheckCircle className="size-4" />
                Settings Saved!
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
