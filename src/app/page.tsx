"use client";

import { lazy, Suspense, useContext } from "react";
import { RouterProvider, RouterContext } from "@/context/RouterContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";

const Navbar = lazy(() => import("@/components/common/Navbar"));
const Footer = lazy(() => import("@/components/common/Footer"));
const CartDrawer = lazy(() => import("@/components/common/CartDrawer"));
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Shop = lazy(() => import("@/pages/Shop"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Training = lazy(() => import("@/pages/Training"));
const Contact = lazy(() => import("@/pages/Contact"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminReviews = lazy(() => import("@/pages/admin/AdminReviews"));
const AdminEvents = lazy(() => import("@/pages/admin/AdminEvents"));
const AdminTraining = lazy(() => import("@/pages/admin/AdminTraining"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#B8D63C] rounded-full animate-spin" />
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
      <Suspense fallback={<PageLoader />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>
      {!isAdmin && <Suspense fallback={null}><Footer /></Suspense>}
      <Suspense fallback={null}><CartDrawer /></Suspense>
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
