"use client";

import StatsCard from "@/components/admin/StatsCard";
import { orders as mockOrders } from "@/data/mockData";
import { Package, ShoppingCart, Star, GraduationCap } from "lucide-react";

export default function AdminDashboard() {
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div>
      <h1 className="font-heading text-3xl text-erode-black mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Package} label="Total Products" value="12" />
        <StatsCard icon={ShoppingCart} label="Total Orders" value="3" />
        <StatsCard icon={Star} label="Pending Reviews" value="2" />
        <StatsCard icon={GraduationCap} label="Training Applications" value="2" />
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="font-heading text-xl text-erode-black mb-4">Recent Orders</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Order ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Total</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0">
                  <td className="px-4 py-3 font-medium text-erode-black">{order.id}</td>
                  <td className="px-4 py-3 text-gray-500">{order.date}</td>
                  <td className="px-4 py-3">₹{order.total.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-erode-green text-erode-black"
                          : "bg-erode-black text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
