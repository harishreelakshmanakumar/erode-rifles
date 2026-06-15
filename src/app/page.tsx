"use client";

import { useContext } from "react";
import { RouterProvider, RouterContext } from "@/context/RouterContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CartDrawer from "@/components/common/CartDrawer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Training from "@/pages/Training";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Checkout from "@/pages/Checkout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminReviews from "@/pages/admin/AdminReviews";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminTraining from "@/pages/admin/AdminTraining";
import AdminSettings from "@/pages/admin/AdminSettings";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-8 bg-gray-50/50 overflow-auto">
        {children}
      </div>
    </div>
  );
}

function ForgotPassword() {
  const { navigate } = useContext(RouterContext);
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl text-erode-black">RESET PASSWORD</h1>
          <p className="text-sm text-erode-black/50 mt-2">Enter your email to receive a password reset link</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Password reset link sent! Check your email."); navigate("/login"); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-erode-black">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-erode-green focus:ring-2 focus:ring-erode-green/20"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-erode-green text-erode-black font-bold h-11 rounded-xl hover:bg-erode-green/90 transition-colors cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>
          <p className="text-center text-sm text-erode-black/50 mt-4">
            Remember your password?{" "}
            <button onClick={() => navigate("/login")} className="text-erode-green font-semibold hover:underline cursor-pointer">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function AppRouter() {
  const { path } = useContext(RouterContext);

  const renderPage = () => {
    if (path === "/admin") return <AdminDashboard />;
    if (path === "/admin/products") return <AdminProducts />;
    if (path === "/admin/orders") return <AdminOrders />;
    if (path === "/admin/reviews") return <AdminReviews />;
    if (path === "/admin/events") return <AdminEvents />;
    if (path === "/admin/training") return <AdminTraining />;
    if (path === "/admin/settings") return <AdminSettings />;
    if (path === "/login") return <Login />;
    if (path === "/signup") return <Signup />;
    if (path === "/forgot-password") return <ForgotPassword />;
    if (path === "/dashboard") return <Dashboard />;
    if (path === "/checkout") return <Checkout />;
    if (path.startsWith("/products/")) return <ProductDetail />;
    if (path === "/about") return <About />;
    if (path === "/shop") return <Shop />;
    if (path === "/training") return <Training />;
    if (path === "/contact") return <Contact />;
    return <Home />;
  };

  const isAdmin = path.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <AdminLayout>{renderPage()}</AdminLayout>
        <CartDrawer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppRouter />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </RouterProvider>
  );
}
