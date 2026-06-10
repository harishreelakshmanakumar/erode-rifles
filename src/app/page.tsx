"use client";

import { useContext } from "react";
import { RouterProvider, RouterContext } from "@/context/RouterContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CartDrawer from "@/components/common/CartDrawer";
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isAdmin && <Footer />}
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
