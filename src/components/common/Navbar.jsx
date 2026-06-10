"use client";

import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X, LayoutDashboard, Users, Package, Settings, LogOut } from "lucide-react";
import { useRouter } from "@/context/RouterContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Shop", path: "/shop" },
  { label: "Training", path: "/training" },
  { label: "Contact", path: "/contact" },
];

const adminLinks = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { navigate, path } = useRouter();
  const { count, setIsCartOpen } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const isAdminPage = path.startsWith("/admin");

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/shop", { search: searchQuery.trim() });
      setSearchQuery("");
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  const isActive = (linkPath) => {
    if (linkPath === "/") return path === "/";
    return path === linkPath || path.startsWith(linkPath + "/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-erode-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("/")}
              className="flex-shrink-0 cursor-pointer"
            >
              <span className="font-heading text-2xl sm:text-3xl font-bold text-erode-black tracking-wider">
                ERODE RIFLES
              </span>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`
                    text-sm font-medium tracking-wide uppercase transition-colors duration-200 cursor-pointer
                    ${isActive(link.path)
                      ? "text-erode-green"
                      : "text-erode-black hover:text-erode-green"
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop Right Icons */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-erode-black hover:text-erode-green transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => handleNavClick("/wishlist")}
                className="relative p-2 text-erode-black hover:text-erode-green transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-erode-green text-erode-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-erode-black hover:text-erode-green transition-colors cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-erode-green text-erode-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              {/* Auth */}
              {user ? (
                <button
                  onClick={() => handleNavClick(isAdmin ? "/admin" : "/profile")}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-erode-black hover:text-erode-green transition-colors cursor-pointer"
                >
                  <User size={18} />
                  <span className="hidden xl:inline">{user.name?.split(" ")[0]}</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick("/login")}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-erode-green text-erode-black rounded hover:bg-[#a5c235] transition-colors cursor-pointer"
                >
                  <User size={16} />
                  Login
                </button>
              )}
            </div>

            {/* Mobile Right Icons */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-erode-black cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-erode-green text-erode-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-erode-black cursor-pointer"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop Search Bar (expandable) */}
          {searchOpen && (
            <div className="hidden lg:block pb-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for air rifles, pistols, pellets..."
                    className="w-full pl-10 pr-4 py-2.5 border border-erode-black rounded text-sm focus:outline-none focus:border-erode-green"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-erode-green text-erode-black font-semibold rounded text-sm hover:bg-[#a5c235] transition-colors cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-erode-black">
              <span className="font-heading text-xl font-bold text-erode-black tracking-wider">
                ERODE RIFLES
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-erode-black cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="px-6 py-4 border-b border-gray-100">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 border border-erode-black rounded text-sm focus:outline-none focus:border-erode-green"
                  />
                </div>
              </form>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`
                    block w-full text-left py-3 text-base font-medium tracking-wide uppercase transition-colors duration-200 cursor-pointer border-b border-gray-100
                    ${isActive(link.path)
                      ? "text-erode-green"
                      : "text-erode-black hover:text-erode-green"
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}

              {/* Wishlist Link */}
              <button
                onClick={() => handleNavClick("/wishlist")}
                className="flex items-center gap-3 w-full text-left py-3 text-base font-medium tracking-wide uppercase text-erode-black hover:text-erode-green transition-colors cursor-pointer border-b border-gray-100"
              >
                <Heart size={18} />
                Wishlist
                {wishlistItems.length > 0 && (
                  <span className="bg-erode-green text-erode-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Auth */}
              {user ? (
                <>
                  <button
                    onClick={() => handleNavClick(isAdmin ? "/admin" : "/profile")}
                    className="flex items-center gap-3 w-full text-left py-3 text-base font-medium tracking-wide uppercase text-erode-black hover:text-erode-green transition-colors cursor-pointer border-b border-gray-100"
                  >
                    <User size={18} />
                    {user.name}
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left py-3 text-base font-medium tracking-wide uppercase text-erode-black hover:text-erode-green transition-colors cursor-pointer border-b border-gray-100"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavClick("/login")}
                  className="flex items-center gap-3 w-full text-left py-3 text-base font-medium tracking-wide uppercase text-erode-black hover:text-erode-green transition-colors cursor-pointer border-b border-gray-100"
                >
                  <User size={18} />
                  Login / Sign Up
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
