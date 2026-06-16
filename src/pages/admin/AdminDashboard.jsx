"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/admin/StatsCard";
import { Package, ShoppingCart, MessageSquare, Users } from "lucide-react";
import { apiUrl } from "@/lib/apiUrl";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingEnquiries: 0,
    totalUsers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("erodeToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Fetch dashboard stats
        const statsRes = await fetch(apiUrl("dashboard/stats"), { headers });
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(statsData.data);
        }

        // Fetch recent orders
        const ordersRes = await fetch(apiUrl("orders"), { headers });
        const ordersData = await ordersRes.json();
        if (ordersData.success) {
          setRecentOrders(ordersData.data.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        // Fallback: use mock data
        const { orders } = await import("@/data/mockData");
        setRecentOrders(orders.slice(0, 5));
        setStats({
          totalProducts: 18,
          totalOrders: orders.length,
          pendingEnquiries: 2,
          totalUsers: 5,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PACKED: "bg-purple-100 text-purple-800",
    DISPATCHED: "bg-orange-100 text-orange-800",
    DELIVERED: "bg-erode-green/20 text-erode-green",
    CANCELLED: "bg-red-100 text-red-800",
    Delivered: "bg-erode-green/20 text-erode-green",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl text-erode-black">Dashboard</h1>
        <p className="text-sm text-erode-black/50 mt-1">Overview of your store performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Package} label="Total Products" value={stats.totalProducts?.toString() || "—"} />
        <StatsCard icon={ShoppingCart} label="Total Orders" value={stats.totalOrders?.toString() || "—"} />
        <StatsCard icon={MessageSquare} label="Pending Enquiries" value={stats.pendingEnquiries?.toString() || "—"} />
        <StatsCard icon={Users} label="Total Users" value={stats.totalUsers?.toString() || "—"} />
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="font-heading text-xl text-erode-black mb-4">Recent Orders</h2>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-erode-black/40">
              {loading ? "Loading orders..." : "No orders yet"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-medium text-erode-black/50">Order ID</th>
                    <th className="text-left px-4 py-3 font-medium text-erode-black/50">Customer</th>
                    <th className="text-left px-4 py-3 font-medium text-erode-black/50">Total</th>
                    <th className="text-left px-4 py-3 font-medium text-erode-black/50">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-erode-black/50">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id || order.orderNumber} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-erode-black">
                        {order.orderNumber || order.id}
                      </td>
                      <td className="px-4 py-3 text-erode-black/70">
                        {order.customerName || "—"}
                      </td>
                      <td className="px-4 py-3 font-medium text-erode-black">
                        ₹{(order.total || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            statusColors[order.status] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-erode-black/50">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : order.date || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
