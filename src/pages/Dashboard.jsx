"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/context/RouterContext";
import { orders as mockOrders } from "@/data/mockData";
import OrderCard from "@/components/dashboard/OrderCard";
import WishlistGrid from "@/components/dashboard/WishlistGrid";
import TrainingStatus from "@/components/dashboard/TrainingStatus";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Package, Heart, GraduationCap, Save } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "training", label: "Training", icon: GraduationCap },
];

function ProfileForm({ user }) {
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="font-heading text-2xl text-erode-black mb-6">
        Your Profile
      </h2>
      <div className="max-w-lg space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Name</Label>
          <Input
            id="profile-name"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <Input
            id="profile-email"
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-phone">Phone</Label>
          <Input
            id="profile-phone"
            type="tel"
            value={profileData.phone}
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
          />
        </div>
        <div className="pt-2">
          <Button
            onClick={handleSaveProfile}
            className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2"
          >
            <Save className="size-4" />
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="size-8 border-2 border-gray-300 border-t-erode-green rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-[70vh]">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white p-4 shrink-0">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-erode-green rounded-full flex items-center justify-center mb-2">
            <span className="text-erode-black font-bold text-lg">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <p className="font-semibold text-erode-black">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-erode-green text-erode-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeTab === "profile" && <ProfileForm user={user} />}

        {activeTab === "orders" && (
          <div>
            <h2 className="font-heading text-2xl text-erode-black mb-6">
              Your Orders
            </h2>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            <h2 className="font-heading text-2xl text-erode-black mb-6">
              Your Wishlist
            </h2>
            <WishlistGrid />
          </div>
        )}

        {activeTab === "training" && (
          <div>
            <h2 className="font-heading text-2xl text-erode-black mb-6">
              Training Applications
            </h2>
            <TrainingStatus />
          </div>
        )}
      </div>
    </div>
  );
}
