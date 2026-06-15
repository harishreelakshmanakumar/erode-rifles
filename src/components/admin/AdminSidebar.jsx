"use client";

import { useRouter } from "@/context/RouterContext";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Star,
  Calendar,
  GraduationCap,
  Settings,
  MessageSquare,
  Image,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const navLinks = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/products", label: "Products", icon: Package },
  { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { path: "/admin/reviews", label: "Testimonials", icon: Star },
  { path: "/admin/events", label: "Events", icon: Calendar },
  { path: "/admin/training", label: "Training", icon: GraduationCap },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const { path, navigate } = useRouter();
  const { user, logout, isAdmin } = useAuth();

  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <div className="w-64 border-r border-gray-100 bg-white min-h-screen p-6 shrink-0 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <Settings className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="font-semibold text-erode-black mb-2">Access Denied</h3>
        <p className="text-sm text-erode-black/50 mb-4">
          You need admin credentials to access this panel.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-erode-green text-erode-black font-semibold py-2.5 rounded-xl hover:bg-erode-green/90 transition-colors cursor-pointer text-sm"
        >
          Admin Login
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full mt-2 flex items-center justify-center gap-2 text-sm text-erode-black/60 hover:text-erode-black py-2 cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Website
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 border-r border-gray-100 bg-erode-black min-h-screen p-4 shrink-0 hidden md:flex flex-col">
      {/* Logo */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <button
          onClick={() => navigate("/admin")}
          className="font-heading text-xl text-white tracking-widest cursor-pointer"
        >
          ERODE RIFLES
        </button>
        <p className="text-xs text-white/40 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = path === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-erode-green text-erode-black"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-4" />
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* User info & Logout */}
      <div className="pt-4 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-erode-green/20 flex items-center justify-center">
            <span className="text-erode-green text-xs font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{user?.name || "Admin"}</p>
            <p className="text-[10px] text-white/40">{user?.email || ""}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          Sign Out
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/40 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Website
        </button>
      </div>
    </div>
  );
}
