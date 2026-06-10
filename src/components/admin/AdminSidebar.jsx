"use client";

import { useRouter } from "@/context/RouterContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Star,
  Calendar,
  GraduationCap,
  Settings,
} from "lucide-react";

const navLinks = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/products", label: "Products", icon: Package },
  { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { path: "/admin/reviews", label: "Reviews", icon: Star },
  { path: "/admin/events", label: "Events", icon: Calendar },
  { path: "/admin/training", label: "Training", icon: GraduationCap },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const { path, navigate } = useRouter();

  return (
    <div className="w-64 border-r border-gray-200 bg-white min-h-screen p-4 shrink-0">
      {/* Logo */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <button
          onClick={() => navigate("/admin")}
          className="font-heading text-2xl text-erode-black tracking-wide"
        >
          ERODE RIFLES
        </button>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = path === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-erode-green text-erode-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="size-4" />
              {link.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
