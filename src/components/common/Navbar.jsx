"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X, LogOut, ChevronDown, Phone } from "lucide-react";
import { useRouter } from "@/context/RouterContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Shop", path: "/shop" },
  { label: "Training", path: "/training" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { navigate, path } = useRouter();
  const { count, setIsCartOpen, mounted: cartMounted } = useCart();
  const { user, logout, isAdmin, mounted: authMounted } = useAuth();
  const { items: wishlistItems, mounted: wishlistMounted } = useWishlist();

  // Consolidated mounted state — only render client-only UI after all contexts hydrate
  const mounted = cartMounted && authMounted && wishlistMounted;

  // Track scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track previous path to close menus on navigation
  const prevPath = useRef(path);
  useEffect(() => {
    if (prevPath.current !== path) {
      prevPath.current = path;
    }
  }, [path]);
  // Close menus when path changes (handled via handleNavClick instead)

  // Close dropdown on click outside
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = () => setUserMenuOpen(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [userMenuOpen]);

  const handleNavClick = (navPath) => {
    navigate(navPath);
    setMobileOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
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
      {/* Top bar - contact info */}
      <div className="bg-erode-black text-white/70 text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+919994893337" className="flex items-center gap-1.5 hover:text-erode-green transition-colors">
              <Phone size={12} />
              +91 999 489 3337
            </a>
            <a href="tel:+919842991959" className="flex items-center gap-1.5 hover:text-erode-green transition-colors">
              <Phone size={12} />
              +91 984 299 1959
            </a>
            <a href="mailto:contact@eroderifles.com" className="hover:text-erode-green transition-colors">
              contact@eroderifles.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon - Sun: 9:00 AM - 9:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "shadow-lg shadow-black/5 border-b border-gray-100"
            : "border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo - More Prominent */}
            <button
              onClick={() => handleNavClick("/")}
              className="flex-shrink-0 cursor-pointer group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-erode-green/40"
            >
              <div className="flex items-center gap-2">
                {/* Green accent bar */}
                <div className="w-1.5 h-9 sm:h-10 bg-erode-green rounded-full group-hover:h-12 transition-all duration-300 shadow-[0_0_18px_rgba(184,214,60,0.45)]" />
                <div>
                  <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-erode-black tracking-[0.2em] leading-none block">
                    ERODE
                  </span>
                  <span className="font-heading text-sm sm:text-base lg:text-lg font-bold text-erode-green tracking-[0.3em] leading-none block">
                    RIFLES
                  </span>
                </div>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full border border-gray-100 bg-gray-50/80 p-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative px-4 py-2 text-[13px] font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer rounded-full ${
                    isActive(link.path)
                      ? "text-erode-black bg-white shadow-sm"
                      : "text-erode-black/60 hover:text-erode-black hover:bg-white/80"
                  }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-erode-green rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Desktop Right Icons */}
            <div className="hidden lg:flex items-center gap-1.5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  searchOpen
                    ? "bg-erode-green/15 text-erode-black"
                    : "text-erode-black/60 hover:text-erode-black hover:bg-gray-50"
                }`}
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => handleNavClick("/dashboard")}
                className="relative p-2.5 rounded-lg text-erode-black/60 hover:text-erode-black hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {mounted && wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-erode-green text-erode-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-lg text-erode-black/60 hover:text-erode-black hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
                {mounted && count > 0 && (
                  <span className="absolute top-1 right-1 bg-erode-green text-erode-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {count}
                  </span>
                )}
              </button>

              {/* Auth */}
              {mounted && user ? (
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-erode-black/60 hover:text-erode-black hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-erode-green/20 flex items-center justify-center">
                      <span className="text-erode-green text-xs font-bold">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden xl:inline text-sm">{user.name?.split(" ")[0]}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* User dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50"
                      >
                        <button
                          onClick={() => handleNavClick(isAdmin ? "/admin" : "/dashboard")}
                          className="w-full text-left px-4 py-2.5 text-sm text-erode-black/80 hover:bg-gray-50 hover:text-erode-black transition-colors cursor-pointer flex items-center gap-2"
                        >
                          <User size={16} />
                          {isAdmin ? "Admin Panel" : "My Dashboard"}
                        </button>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-2"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick("/login")}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-erode-green text-erode-black rounded-full hover:bg-erode-green/90 hover:-translate-y-0.5 transition-all cursor-pointer shadow-sm"
                >
                  <User size={16} />
                  Login
                </button>
              )}
            </div>

            {/* Mobile Right Icons */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-full text-erode-black bg-gray-50 cursor-pointer"
                aria-label="Search"
              >
                <Search size={19} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full text-erode-black bg-gray-50 cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {mounted && count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-erode-green text-erode-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-full text-erode-black bg-erode-green cursor-pointer"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop Search Bar (expandable) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <form onSubmit={handleSearch} className="flex items-center gap-2 pb-4">
                  <div className="flex-1 relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for air rifles, pistols, pellets, accessories..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-erode-green focus:ring-2 focus:ring-erode-green/20 transition-all"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    className="hidden sm:block px-6 py-3 bg-erode-green text-erode-black font-semibold rounded-xl text-sm hover:bg-erode-green/90 transition-colors cursor-pointer"
                  >
                    Search
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-erode-black text-white">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-8 bg-erode-green rounded-full" />
                  <div>
                    <span className="font-heading text-lg font-bold text-white tracking-[0.2em] block leading-none">ERODE</span>
                    <span className="font-heading text-xs font-bold text-erode-green tracking-[0.3em] block leading-none">RIFLES</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full bg-white/10 text-white hover:text-erode-green transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/70">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-erode-green focus:ring-2 focus:ring-erode-green/20 transition-all"
                    />
                  </div>
                </form>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-6 py-4">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleNavClick(link.path)}
                    className={`flex items-center justify-between w-full text-left my-1 rounded-xl px-3 py-3.5 text-base font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                      isActive(link.path)
                        ? "text-erode-black bg-erode-green/15"
                        : "text-erode-black hover:text-erode-green hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-erode-green" />
                    )}
                  </motion.button>
                ))}

                {/* Wishlist Link */}
                <button
                  onClick={() => handleNavClick("/dashboard")}
                  className="flex items-center gap-3 w-full text-left my-1 rounded-xl px-3 py-3.5 text-base font-semibold tracking-wide uppercase text-erode-black hover:text-erode-green hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Heart size={18} />
                  Wishlist
                  {mounted && wishlistItems.length > 0 && (
                    <span className="bg-erode-green text-erode-black text-xs font-bold px-2 py-0.5 rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>

                {/* Auth */}
                {mounted && user ? (
                  <>
                    <button
                      onClick={() => handleNavClick(isAdmin ? "/admin" : "/dashboard")}
                      className="flex items-center gap-3 w-full text-left my-1 rounded-xl px-3 py-3.5 text-base font-semibold tracking-wide uppercase text-erode-black hover:text-erode-green hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <User size={18} />
                      {isAdmin ? "Admin Panel" : "My Dashboard"}
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-left my-1 rounded-xl px-3 py-3.5 text-base font-semibold tracking-wide uppercase text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="mt-4 space-y-3">
                    <button
                      onClick={() => handleNavClick("/login")}
                      className="w-full flex items-center justify-center gap-2 py-3 text-base font-semibold bg-erode-green text-erode-black rounded-xl hover:bg-erode-green/90 transition-colors cursor-pointer"
                    >
                      <User size={18} />
                      Login
                    </button>
                    <button
                      onClick={() => handleNavClick("/signup")}
                      className="w-full flex items-center justify-center gap-2 py-3 text-base font-medium border-2 border-erode-black text-erode-black rounded-xl hover:bg-erode-black hover:text-white transition-colors cursor-pointer"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </nav>

              {/* Mobile Contact Info */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 text-sm text-erode-black/60 mb-2">
                  <Phone size={14} className="text-erode-green" />
                  <a href="tel:+919994893337" className="hover:text-erode-green transition-colors">+91 999 489 3337</a>
                </div>
                <p className="text-xs text-erode-black/40">Mon - Sun: 9:00 AM - 9:00 PM</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
